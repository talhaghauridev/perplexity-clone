'use client';

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '../components/sidebar';

export default function HomePage() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-4 text-2xl font-semibold">Welcome to Claude</h1>
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
