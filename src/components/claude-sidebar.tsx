'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Clock, Plus } from 'lucide-react';
import SidebarUserMenu from './sidebar-user-menu';
import Logo from '@/lib/logo';

const recentItems = [
  'AI Agent Services for Business ...',
  'Web Services Portfolio Review',
  'AI Services for SME Business A...',
  'Untitled',
  'LangGraph Human-in-Loop API ...',
  'AI Business Suite Enhancement',
  'NPM Installation Force Error',
  'Matplotlib Data Visualization Ba...',
  'FFmpeg WebAssembly Memory ...',
  'Windows 10 Background Apps M...',
  'LangGraph Human-in-Loop API ...',
  'AI Business Suite Enhancement',
  'NPM Installation Force Error',
  'Matplotlib Data Visualization Ba...',
  'FFmpeg WebAssembly Memory ...',
  'Windows 10 Background Apps M...',
  'LangGraph Human-in-Loop API ...',
  'AI Business Suite Enhancement',
  'NPM Installation Force Error',
  'Matplotlib Data Visualization Ba...',
  'FFmpeg WebAssembly Memory ...',
  'Windows 10 Background Apps M...',
];

export function ClaudeSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      className="border-r">
      {/* Header Section  */}
      <SidebarHeader className="border-sidebar-border border-b px-2 py-[8px] group-data-[collapsible=icon]:px-2">
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
      </SidebarHeader>

      <SidebarContent className="gap-0 overflow-hidden">
        <SidebarGroup className="pt-[15px]">
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="New chat"
                  className="hover:text-primary text-white">
                  <Plus className="h-5 w-5" />
                  <span className="truncate">New chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Chats */}
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

        {/* History Section */}
        <div className="custom-scrollbar">
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupContent className="relative mb-2 flex-1">
              <div className="relative mb-2 flex-1">
                <SidebarMenu>
                  {recentItems.map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton className="text-sidebar-foreground/80 hover:text-sidebar-foreground h-auto py-2 text-sm">
                        <span className="truncate">{item}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>

      <SidebarFooter>
        <SidebarUserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
