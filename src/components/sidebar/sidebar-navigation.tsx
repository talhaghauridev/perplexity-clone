'use client';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Clock, Compass, Plus } from 'lucide-react';

export function SidebarNavigation() {
  return (
    <>
      <SidebarGroup className="pt-[15px]">
        <SidebarGroupContent>
          <SidebarMenu className="gap-[10px]">
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="New chat">
                <Plus className="h-5 w-5" />
                <span className="truncate">New chat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Discover">
                <Compass className="h-5 w-5" />
                <span>Discover</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="History">
                <Clock className="h-5 w-5" />
                <span>History</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarSeparator className="group-data-[collapsible=icon]:hidden" />
    </>
  );
}
