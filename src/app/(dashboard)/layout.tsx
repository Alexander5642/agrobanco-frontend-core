import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { getUser } from '@/lib/localAuth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getUser()

  if (!user) {
    redirect('/login')
  }

  if (user.rol === 'ADMIN') {
    redirect('/admin')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
