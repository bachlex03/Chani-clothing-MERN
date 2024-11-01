import { DropdownMenu, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import {
   SidebarContent,
   Sidebar,
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuItem,
   SidebarMenuButton,
   SidebarGroupContent,
   SidebarHeader,
   SidebarFooter,
} from './ui/sidebar';
import { DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Collapsible, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { CollapsibleContent } from './ui/collapsible';
import Link from 'next/link';

const applicationItems = [
   {
      title: 'Dashboard',
      url: '/dashboards',
      icon: '',
   },
];

const usuallyItems = [
   {
      title: 'Products',
      url: '/dashboards/products',
      icon: '',
   },
   {
      title: 'Invoices',
      url: '/dashboards/invoices',
      icon: '',
   },
];

const otherItems = [
   {
      title: 'Categories',
      url: '/dashboards/categories',
      icon: '',
   },
   {
      title: 'Promotions',
      url: '/dashboards/promotions',
      icon: '',
   },
];

export default function DashBoardSidebar() {
   return (
      <Sidebar>
         <SidebarHeader />
         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupLabel>Application</SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {applicationItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                           <SidebarMenuButton asChild>
                              <Link href={item.url}>
                                 <i>icon</i>
                                 <span>{item.title}</span>
                              </Link>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
               <SidebarGroupLabel>Usually</SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {usuallyItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                           <SidebarMenuButton asChild>
                              <Link href={item.url}>
                                 <i>icon</i>
                                 <span>{item.title}</span>
                              </Link>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
               <SidebarGroupLabel>Others</SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {otherItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                           <SidebarMenuButton asChild>
                              <Link href={item.url}>
                                 <i>icon</i>
                                 <span>{item.title}</span>
                              </Link>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>

         <SidebarFooter>
            <SidebarMenu>
               <SidebarMenuItem>
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <SidebarMenuButton>
                           <i>Username</i>
                           <i>icon</i>
                        </SidebarMenuButton>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent
                        side="top"
                        className="w-[--radix-popper-anchor-width]"
                     >
                        <DropdownMenuItem>
                           <span>Account</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                           <span>Billing</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                           <span>Sign out</span>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarFooter>
      </Sidebar>
   );
}
