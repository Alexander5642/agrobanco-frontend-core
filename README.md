# 🏦 Core Bancario Digital - Agrobanco

Un sistema bancario avanzado construido con Next.js 15, Tailwind CSS y Supabase. 
Incluye módulos para clientes (transferencias, solicitud de créditos) y un panel avanzado de BackOffice para administradores.

## 🚀 Requisitos Previos

Asegúrate de tener instalado en tu máquina:
- Node.js (v18 o superior)
- npm o yarn

## 🛠️ Instalación y Configuración

1. **Clonar el repositorio y entrar a la carpeta:**
   ```bash
   cd proyect_sem4
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Configurar las Variables de Entorno (IMPORTANTE):**
   Para que el proyecto se conecte a la base de datos (Supabase), debes crear un archivo llamado `.env.local` en la raíz del proyecto (en la misma carpeta que el `package.json`) y pegar esto adentro:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://pfmsvalvvdpapmghhyap.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_BMfic8gDSCuqpEt7NPGGzw_1o9FbGdw
   ```

## 💻 Ejecución del Proyecto

Una vez configuradas las variables, arranca el servidor de desarrollo:

```bash
npm run dev
```

Abre tu navegador y entra a: **[http://localhost:3000](http://localhost:3000)**

## 🔑 Cuentas de Prueba (Data Semilla)

La base de datos ya cuenta con información inyectada para probar el flujo completo:

### Cuenta Administrador (BackOffice)
- **Correo:** `admin@agrobanco.com`
- **Clave:** `adminpassword123`
*(Acceso exclusivo al panel `/admin` para ver auditoría global, evaluar créditos y perfiles detallados)*

### Cuentas Cliente Normal
- **Correo:** `juan@cliente.com`
- **Clave:** `password123`
*(Tiene S/ 46,000 en su cuenta y créditos aprobados)*

- **Correo:** `maria@cliente.com`
- **Clave:** `password123`
*(Tiene S/ 10,000 en su cuenta y créditos pendientes)*

## 📦 Arquitectura de Base de Datos
Este proyecto utiliza triggers avanzados en Supabase (PL/pgSQL) para la creación automática de cuentas bancarias y balances iniciales cuando un usuario se registra, sin intervención del frontend.
