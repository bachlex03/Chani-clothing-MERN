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

export type AppInputProps = {
   form: UseFormReturn;
   name: string;
   placeholder?: string;
   label?: string;
   description?: string;
   type?: string;
   defaultValue?: string | number;
   disabled?: boolean;
};

export default function AppInput(props: AppInputProps) {
   return (
      <FormField
         control={props.form.control || undefined}
         name={props.name || ''}
         render={({ field }) => (
            <FormItem>
               <FormLabel>{props.label || ''}</FormLabel>
               <FormControl>
                  <Input
                     placeholder={props.placeholder || ''}
                     {...field}
                     className="w-full dark:bg-five"
                     accept="image/*"
                     multiple
                     type={props.type || 'text'}
                     disabled={props.disabled}
                  />
               </FormControl>
               <FormDescription>{props.description}</FormDescription>
               <FormMessage />
            </FormItem>
         )}
      />
   );
}
