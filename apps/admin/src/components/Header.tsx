import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import ModeToggle from './modeToggle';

export default function Header({ className = '' }) {
   return (
      <header
         className={`absolute flex items-center justify-end top-0 bg-slate-300 dark:bg-five w-[-webkit-fill-available] h-[--header-height] ${className}`}
      >
         <div className="flex items-center gap-5 mr-10">
            <i className="text-2xl ">
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
