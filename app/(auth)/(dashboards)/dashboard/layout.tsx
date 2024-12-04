// app/dashboard/layout.tsx
import { redirect } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export default async function DashboardLayout({ children }: {children: React.ReactNode}) {
  const session = await authClient.getSession()
  
  if (!session) {
    redirect('/signin')
  }
  
  return <div>{children}</div>
}