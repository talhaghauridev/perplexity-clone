'use client';

import {
  SidebarHeader as SidebarHeaderComponent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Logo from '@/lib/logo';

export function SidebarHeader() {
  return (
    <SidebarHeaderComponent className="border-sidebar-border border-b px-2 py-[8px] group-data-[collapsible=icon]:px-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
            <span className="truncate group-data-[collapsible=icon]:hidden">
              <Logo />
            </span>
            <div className="flex min-h-[32px] items-center justify-end">
              <SidebarTrigger className="text-sidebar-foreground/70 ml-0" />
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeaderComponent>
  );
}
