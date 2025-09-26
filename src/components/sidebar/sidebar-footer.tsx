'use client';

import {
  SidebarFooter as SidebarFooterComponent,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAuthState } from '@/lib/auth-provider';
import { cn } from '@/lib/utils';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
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
        <Link
          href={'/sign-in'}
          className={cn(
            buttonVariants(),
            'mx-2 flex w-full cursor-pointer items-center justify-center gap-1.5 group-data-[collapsible=icon]:mx-0'
          )}>
          <CircleUser />
          <span className="truncate group-data-[collapsible=icon]:hidden">Sign In</span>
        </Link>
      )}
    </SidebarFooterComponent>
  );
}
