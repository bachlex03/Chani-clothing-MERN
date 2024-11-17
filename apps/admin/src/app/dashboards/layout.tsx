'use client';

import { useEffect, useState } from 'react';
import DashBoardSidebar from '~/components/DashboardSidebar';
import Header from '~/components/Header';
import { ThemeProvider } from '~/components/themesProvider';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import { withAuth } from '~/hooks/with-auth';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   const [isMounted, setIsMounted] = useState(false);

   // Ensure theme provider only renders on the client
   useEffect(() => {
      setIsMounted(true);
   }, []);

   return (
      <div>
         <SidebarProvider>
            <DashBoardSidebar />
            <main className="w-full dark:bg-four">
               <SidebarTrigger className="w-24 ml-2 mt-2 rounded-[4px] absolute z-20" />

               {isMounted && (
                  <ThemeProvider
                     attribute="class"
                     defaultTheme="dark"
                     enableSystem={false}
                     disableTransitionOnChange
                  >
                     <Header />
                     {children}
                  </ThemeProvider>
               )}
            </main>
         </SidebarProvider>
      </div>
   );
};

export default withAuth(DashboardLayout);
