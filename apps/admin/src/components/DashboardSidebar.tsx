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
      url: '/dashboard',
      icon: '',
   },
];

const usuallyItems = [
   {
      title: 'Products',
      url: '/products',
      icon: '',
   },
   {
      title: 'Invoices',
      url: '#',
      icon: '',
   },
   {
      title: 'Customers',
      url: '#',
      icon: '',
   },
];

const otherItems = [
   {
      title: 'Categories',
      url: '#',
      icon: '',
   },
   {
      title: 'Promotions',
      url: '#',
      icon: '',
   },
];

export default function DashBoardSidebar() {
   return (
      <Sidebar>
         <SidebarHeader />
         <SidebarContent>
            <Collapsible>
               <SidebarGroup>
                  <SidebarGroupLabel asChild>
                     <CollapsibleTrigger>Application</CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                     <SidebarGroupContent>
                        <SidebarMenu>
                           {applicationItems.map((item) => (
                              <SidebarMenuItem key={item.title}>
                                 <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                       <i>icon</i>
                                       <span>{item.title}</span>
                                    </a>
                                 </SidebarMenuButton>
                              </SidebarMenuItem>
                           ))}
                        </SidebarMenu>
                     </SidebarGroupContent>
                  </CollapsibleContent>
               </SidebarGroup>
            </Collapsible>

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
                              <a href={item.url}>
                                 <i>icon</i>
                                 <span>{item.title}</span>
                              </a>
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
