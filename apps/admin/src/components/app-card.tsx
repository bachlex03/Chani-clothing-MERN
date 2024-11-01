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
      <AppCardContent>
         <section>
            <p className="text-sm font-medium">{props.label}</p>
         </section>

         <section className="flex flex-col">
            <h2 className="text-2xl font-bold">{props.amount}</h2>
            <p className="text-xs text-gray-500">{props.description}</p>
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
