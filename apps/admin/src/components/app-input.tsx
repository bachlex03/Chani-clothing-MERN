/* eslint-disable @typescript-eslint/no-explicit-any */
import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from './ui/form';

import { UseFormReturn } from 'react-hook-form';
import { Input } from './ui/input';

export default function AppInput({
   form,
   name = '',
   label = '',
   description = '',
}: {
   form: UseFormReturn;
   name: string;
   label?: string;
   description?: string;
}) {
   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem>
               <FormLabel>{label}</FormLabel>
               <FormControl>
                  <Input
                     placeholder="Product title"
                     {...field}
                     className="w-full"
                  />
               </FormControl>
               <FormDescription>{description}</FormDescription>
               <FormMessage />
            </FormItem>
         )}
      />
   );
}
