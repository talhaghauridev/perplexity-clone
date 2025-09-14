'use client';

import { SidebarFooter as SidebarFooterComponent } from '@/components/ui/sidebar';
import SidebarUserMenu from '../sidebar-user-menu';

export function SidebarFooter() {
  return (
    <SidebarFooterComponent>
      <SidebarUserMenu />
    </SidebarFooterComponent>
  );
}
