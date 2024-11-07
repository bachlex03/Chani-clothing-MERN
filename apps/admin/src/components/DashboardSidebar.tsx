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
   SidebarMenuSub,
   SidebarMenuSubItem,
   SidebarMenuSubButton,
} from './ui/sidebar';
import { DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Collapsible, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { CollapsibleContent } from './ui/collapsible';
import Link from 'next/link';
import { MdOutlineSpaceDashboard, MdOutlineDiscount } from 'react-icons/md';
import { TbBrandProducthunt, TbFileInvoice, TbCategory } from 'react-icons/tb';
import { Button } from './ui/button';
import { ChevronUp, User2 } from 'lucide-react';
import { PiSignOutBold } from 'react-icons/pi';

const applicationItems = [
   {
      title: 'Dashboard',
      url: '/dashboards',
      icon: <MdOutlineSpaceDashboard className="text-[18px] ml-3" />,
   },
];

const usuallyItems = [
   {
      title: 'Products',
      url: '/dashboards/products',
      icon: <TbBrandProducthunt className="text-[18px] ml-3" />,
   },
   {
      title: 'Invoices',
      url: '/dashboards/invoices',
      icon: <TbFileInvoice className="text-[18px] ml-3" />,
   },
];

const otherItems = [
   {
      title: 'Categories',
      url: '/dashboards/categories',
      icon: <TbCategory className="text-[18px] ml-3" />,
   },
   {
      title: 'Promotions',
      url: '/dashboards/promotions',
      icon: <MdOutlineDiscount className="text-[18px] ml-3" />,
   },
];

export default function DashBoardSidebar() {
   return (
      <Sidebar className="dark:bg-five dark:border-r-slate-600">
         <SidebarHeader />
         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupLabel>Applications</SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {applicationItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                           <SidebarMenuButton asChild>
                              <Link href={item.url}>
                                 <i>{item.icon}</i>
                                 <span className="font-medium">
                                    {item.title}
                                 </span>
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
                                 <i>{item.icon}</i>
                                 <span className="font-medium">
                                    {item.title}
                                 </span>
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
                                 <i>{item.icon}</i>
                                 <span className="font-medium">
                                    {item.title}
                                 </span>
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
                           <User2 /> Username
                           <ChevronUp className="ml-auto" />
                        </SidebarMenuButton>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent
                        side="top"
                        className="w-[--radix-popper-anchor-width] dark:bg-four"
                     >
                        <DropdownMenuItem className="py-1 dark:hover:bg-slate-600 flex items-center">
                           <i className="ml-2">
                              <PiSignOutBold />
                           </i>
                           <span className="text-sm ml-3">Sign out</span>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarFooter>
      </Sidebar>
   );
}
