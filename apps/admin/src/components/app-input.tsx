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
   value?: string | number;
   setValue?: (e: any) => void;
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
                     type={props.type || 'text'}
                     disabled={props.disabled}
                     value={props.value}
                     // defaultValue={field.value}
                     onChange={(e) => {
                        if (props.setValue) {
                           field.onChange(e);

                           if (
                              props.type === 'number' &&
                              e.target.value.startsWith('0')
                           ) {
                              props.setValue(e.target.value.slice(1));
                           } else {
                              props.setValue(e.target.value);
                           }
                        }
                     }}
                  />
               </FormControl>
               <FormDescription>{props.description}</FormDescription>
               <FormMessage />
            </FormItem>
         )}
      />
   );
}
