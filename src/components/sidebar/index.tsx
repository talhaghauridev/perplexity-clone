import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { SidebarFooter } from './sidebar-footer';
import { SidebarHeader } from './sidebar-header';
import { SidebarNavigation } from './sidebar-navigation';
import { SidebarRecentChats } from './sidebar-recent-chats';

export default function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      className="border-r">
      <SidebarHeader />
      <SidebarContent className="gap-0 overflow-hidden">
        <SidebarNavigation />
        <SidebarRecentChats />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
