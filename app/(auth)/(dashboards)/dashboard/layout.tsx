import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from '@/components/dashbasic/dashboardSidebar';
import { redirect } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await authClient.getSession()
  if (!session) {
    redirect('/sign-in')
  }
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
