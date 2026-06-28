-- Limpiar tablas viejas (Borra datos existentes incompatibles)
DROP TABLE IF EXISTS public.movimientos;
DROP TABLE IF EXISTS public.creditos;
DROP TABLE IF EXISTS public.cuentas;
DROP TABLE IF EXISTS public.clientes;

-- 0. Crear tabla para Clientes (Información Personal)
CREATE TABLE public.clientes (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  dni VARCHAR(8) NOT NULL UNIQUE,
  celular VARCHAR(15),
  fecha_nacimiento DATE,
  direccion TEXT,
  rol VARCHAR(20) DEFAULT 'CLIENTE',
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 1. Crear tabla para Cuentas
CREATE TABLE public.cuentas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  numero_cuenta VARCHAR(20) NOT NULL UNIQUE,
  saldo DECIMAL(12, 2) DEFAULT 0.00,
  trea DECIMAL(6, 4) DEFAULT 1.5000,
  tem DECIMAL(6, 4) DEFAULT 0.1241,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Crear tabla para Créditos
CREATE TABLE public.creditos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  monto DECIMAL(12, 2) NOT NULL,
  meses INTEGER NOT NULL,
  tea DECIMAL(6, 4) DEFAULT 3.5000,
  cuota_mes DECIMAL(12, 2) NOT NULL,
  intereses DECIMAL(12, 2) NOT NULL,
  total DECIMAL(12, 2) NOT NULL,
  estado VARCHAR(20) DEFAULT 'ENVIADO',
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Crear tabla para Movimientos
CREATE TABLE public.movimientos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cuenta_id UUID REFERENCES public.cuentas(id) NOT NULL,
  tipo VARCHAR(50) NOT NULL, 
  monto DECIMAL(12, 2) NOT NULL,
  es_ingreso BOOLEAN DEFAULT true,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Trigger para crear cuenta automática al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.cuentas (user_id, numero_cuenta, saldo)
  VALUES (
    NEW.id,
    '191-' || FLOOR(RANDOM() * 90000000 + 10000000)::TEXT,
    1000.00 -- Inicia con 1000 soles para que pruebes las transferencias
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
