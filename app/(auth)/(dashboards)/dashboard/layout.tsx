// app/dashboard/layout.tsx
import { redirect } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export default async function DashboardLayout({ children }: {children: React.ReactNode}) {
  const session = await authClient.getSession()
  
  // console.log(session.data?.user)
  
  if (!session) {
    redirect('/sign-in')
  }
  
  return <div>{children}</div>
}