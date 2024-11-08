'use client';

import {
   DropdownMenu,
   DropdownMenuContent,
} from '@radix-ui/react-dropdown-menu';
import { useTheme } from 'next-themes';
import { DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';

export default function ModeToggle() {
   const { setTheme } = useTheme();

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
               <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
               <SunIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
               <span className="sr-only">Toggle theme</span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent
            align="end"
            className="dark:bg-five rounded-md w-[120px] mt-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]"
         >
            <DropdownMenuItem
               onClick={() => setTheme('light')}
               className="dark:hover:bg-slate-600 hover:bg-slate-600"
            >
               Light
            </DropdownMenuItem>
            <DropdownMenuItem
               onClick={() => setTheme('dark')}
               className="dark:hover:bg-slate-600 hover:bg-slate-600"
            >
               Dark
            </DropdownMenuItem>
            <DropdownMenuItem
               onClick={() => setTheme('system')}
               className="dark:hover:bg-slate-600 hover:bg-slate-600"
            >
               System
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
