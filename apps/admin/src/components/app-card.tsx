import React from 'react';
import { cn } from '~/lib/utils';

export type AppCardProps = {
   label: string;
   amount: string;
   description: string;
   icon: string;
};

export default function AppCard(props: AppCardProps) {
   return (
      <AppCardContent className="border-none shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]">
         <section>
            <p className="text-sm font-medium">{props.label}</p>
         </section>

         <section className="flex flex-col">
            <h2 className="text-2xl font-bold text-blue-400">{props.amount}</h2>
            <p className="text-xs text-gray-500 font-semibold mt-2">
               {props.description}
            </p>
         </section>
      </AppCardContent>
   );
}

export function AppCardContent(props: React.HTMLAttributes<HTMLDivElement>) {
   return (
      <div
         {...props}
         className={cn(
            'flex w-full flex-col gap-3 rounded-xl border p-5 shadow',
            props.className,
         )}
      />
   );
}
