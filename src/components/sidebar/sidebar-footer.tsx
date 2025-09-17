'use client';

import {
  SidebarFooter as SidebarFooterComponent,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import SidebarUserMenu from '../sidebar-user-menu';
import { User } from '@/types/users';
import { useAuthStore } from '@/stores/auth-store';
import { useMemo } from 'react';
import { UserMenu } from './user-menu';
type SidebarUserMenuProps = { initialUser?: User | null };

export function SidebarFooter({ initialUser }: SidebarUserMenuProps) {
  const { user: clientUser } = useAuthStore();

  const user = useMemo(() => clientUser || initialUser, [clientUser, initialUser]);
  return (
    user && (
      <SidebarFooterComponent>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu user={user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooterComponent>
    )
  );
}
