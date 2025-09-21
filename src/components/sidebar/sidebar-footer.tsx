'use client';

import {
  SidebarFooter as SidebarFooterComponent,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAuthState } from '@/lib/auth-provider';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { UserMenu } from './user-menu';

export function SidebarFooter() {
  const { user, isAuthenticated, isLoading, isInitialized } = useAuthState();
  console.log({ isLoading, isInitialized, user, isAuthenticated });
  return (
    <SidebarFooterComponent>
      {user ? (
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu user={user} />
          </SidebarMenuItem>
        </SidebarMenu>
      ) : (
        <Button className="mx-2 flex group-data-[collapsible=icon]:mx-0">
          <Link
            href={'/sign-in'}
            className="flex w-full items-center justify-center gap-1">
            <CircleUser />
            <span className="truncate group-data-[collapsible=icon]:hidden">Sign In</span>
          </Link>
        </Button>
      )}
    </SidebarFooterComponent>
  );
}
