'use client';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';

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

export function SidebarRecentChats() {
  return (
    <>
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
                      <span className="truncate text-[13px]">{item}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </div>
    </>
  );
}
