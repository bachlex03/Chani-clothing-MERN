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
import Link from 'next/link';
import { MdOutlineSpaceDashboard, MdOutlineDiscount } from 'react-icons/md';
import { TbBrandProducthunt, TbCategory, TbFileInvoice } from 'react-icons/tb';
import { ChevronUp, User2 } from 'lucide-react';
import { PiSignOutBold } from 'react-icons/pi';
import Cookies from 'js-cookie';

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
                        <DropdownMenuItem
                           className="flex items-center py-1 dark:hover:bg-slate-600"
                           onClick={() => {
                              Cookies.remove('access-token');
                              window.location.href = '/auth/login';
                           }}
                        >
                           <i className="ml-2">
                              <PiSignOutBold />
                           </i>
                           <span className="ml-3 text-sm">Sign out</span>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarFooter>
      </Sidebar>
   );
}
