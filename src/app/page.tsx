import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '../components/sidebar';
import { cookies } from 'next/headers';
import { STORAGE_KEYS } from '@/constants/storage-keys';

export default async function HomePage() {
  const cookieStore = await cookies();
  const isCollapsed = cookieStore.get(STORAGE_KEYS.SIDEBAR_COOKIE_NAME)?.value !== 'true';

  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-4xl">
            {/* <h1 className="mb-4 text-2xl font-semibold">Welcome to Claude</h1> */}
            <p className="text-muted-foreground">
              Your AI assistant is ready to help. Use the sidebar to navigate between chats,
              projects, and artifacts.
            </p>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
