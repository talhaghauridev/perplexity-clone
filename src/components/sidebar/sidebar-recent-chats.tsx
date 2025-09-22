'use client';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { useAuthState } from '@/lib/auth-provider';
import { useAuthStore } from '@/stores/auth-store';
import Cookies from 'js-cookie';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
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
  const { user, isAuthenticated } = useAuthState();
  const { setUser } = useAuthStore();
  const COOKIE_OPTIONS = {
    expires: 30,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };
  const dummyUser = {
    id: 'user_123456',
    email: 'johndoe@example.com',
    name: 'Talha Ghouri',
    profilePicture:
      'https://lh3.googleusercontent.com/rd-ogw/AF2bZyh_eUlYuA_ptQKNQ_-kyiIq6MosEkfOG30Etw17SmG9KtFFztO96B759u-X9GvQfA23vrpRIShE20TsPmU3X1qu0bfvJcA0AOehSa3kQop7i6avc8ZlcOX6xF4m0mEMl9uTJXR3inF7ndYtwk7XpWXFtk0nhQbnMPWSkquGXy_8EhVtF3iDerNhu1lKxaIHVHVrrHJvOhmpFDmC2A2HfHM1SziO_Kpa21w5YauqyfOERJjxi0z8KToFs1kc6Cf7rQ-6YcOqy7KtxK3SxGNSrColuxsl5zx7UGN71xI_5Hv-wlQG-jGkjupOZWcX7dAsNfR_Sw_VBB98xAUr1xh3FOGj1xAeGlLasbPFQiXirDIHxsr-HeU-SxjuDhx_u6fhAwug-Bmnui9y6-nEail_QkMs--SyXuJv1AaF3G793gJj5R31RSsYb-FmHCDb5hCPt3N8p_1YznL4jiB4fyO2U0jtMsC1Vh7Apb1En4DDiBCR8T7sL6fFBFK4mw2nP61YkskVs3xYKfAXXosdsPYmDmHRafuXU0gli2EBL57zEjaSi3ntVECBpd3CT_D1TlQxsliadvLmq2hNRn21TC_H5zDJA2iYDSbFLHx5dCK5oVsymNOl02jb6BvLgVQE85gQbeV2rjTYqjfecREmVy8z0XXERBWybIlLfMUVTW_1UEAbzwTEzJHoFVJCdeIIiy6aFOnU1oo9XU3wZ1cZ9qxMS2hOsjKpttVTImWH3tQYM_gC2AA-YBIyNytFo95Np78DGN0qa5Rc1nJEhbOVNpZsH3yrcfS_EEc9QHbysurQN6rMXyPaESR7f6bZN4rQVFVEX_4Cthfx3JhuPKkAScWvaF4cO-4qdBoU52YEx6Gtp-89rDBaNc69npbufCodfE62mC6jGqKUKwAB827HT_j0XD8c5EPydR4CW55MIfH_srxGWAoynq88GL2W0wP95sREAhZEYfDsBRyF0VE8LMxSqbs6ILEj-DuAOjF1mhW1EZQsoWIfSbOl23O3Pv-v1g=s64-c',
    isVerified: true,
    createdAt: new Date('2024-01-01T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-06-01T15:30:00Z').toISOString(),
    provider: 'google' as 'google',
  };
  const router = useRouter();
  const handleSetUser = () => {
    Cookies.set(STORAGE_KEYS.AUTH.USER_DATA, JSON.stringify(dummyUser), COOKIE_OPTIONS);
    Cookies.set(STORAGE_KEYS.AUTH.ACCESS_TOKEN, 'this-is-the-token', COOKIE_OPTIONS);
    setUser(dummyUser);
    // router.refresh();
  };
  return (
    <>
      {user && (
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
      )}

      {/* <Button onClick={handleSetUser}>Set</Button> */}
    </>
  );
}
