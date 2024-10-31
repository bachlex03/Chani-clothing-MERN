'use client';

import { useEffect, useState } from 'react';
import DashBoardSidebar from '~/components/DashboardSidebar';
import Header from '~/components/Header';
import { ThemeProvider } from '~/components/themesProvider';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';

export default function DashboardLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const [isMounted, setIsMounted] = useState(false);

   // Ensure theme provider only renders on the client
   useEffect(() => {
      setIsMounted(true);
   }, []);

   return (
      <div>
         <SidebarProvider>
            <DashBoardSidebar />
            <main className="w-full">
               <Header />
               <SidebarTrigger className="w-24 ml-2 mt-2 rounded-[4px] absolute z-20" />

               {isMounted && (
                  <ThemeProvider
                     attribute="class"
                     defaultTheme="dark"
                     enableSystem={false}
                     disableTransitionOnChange
                  >
                     {children}
                  </ThemeProvider>
               )}
            </main>
         </SidebarProvider>
      </div>
   );
}
