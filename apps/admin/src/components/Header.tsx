import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { MdOutlineSettings } from 'react-icons/md';
import { FaRegBell } from 'react-icons/fa6';
import ModeToggle from './modeToggle';

export default function Header({ className = '' }) {
   return (
      <header
         className={`absolute flex items-center justify-end top-0 bg-slate-300 dark:bg-secondary w-[-webkit-fill-available] h-[--header-height] ${className}`}
      >
         <div className="flex items-center gap-5 mr-10">
            <i className="text-2xl">
               <MdOutlineSettings />
            </i>

            <i className="text-xl">
               <FaRegBell />
            </i>

            <i className="text-2xl">
               <ModeToggle />
            </i>

            <div>
               <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
               </Avatar>
            </div>
         </div>
      </header>
   );
}
