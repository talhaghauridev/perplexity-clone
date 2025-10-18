import { SidebarToggle } from '@/components/shared/sidebar-toggle';
import AppSidebar from '@/components/sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { cookies } from 'next/headers';
import React from 'react';

export default async function SidebarLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isCollapsed = cookieStore.get(STORAGE_KEYS.SIDEBAR_COOKIE_NAME)?.value !== 'true';
  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center gap-2 md:hidden">
          <span className="px-2 py-2">
            <SidebarToggle />
          </span>
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
