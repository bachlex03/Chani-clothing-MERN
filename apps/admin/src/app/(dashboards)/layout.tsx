import DashBoardSidebar from '~/components/DashboardSidebar';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';

export default function DashboardLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <SidebarProvider>
         <DashBoardSidebar />
         <main>
            <SidebarTrigger />
            {children}
         </main>
      </SidebarProvider>
   );
}
