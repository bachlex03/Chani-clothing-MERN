'use client';

import { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '~/components/ui/form';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '~/components/ui/select';

export type SelectDatatype = {
   label: string;
   value: string;
};

export type AppSelectProps = {
   // Add props here
   name: string;
   form: UseFormReturn;
   label?: string;
   description?: string;
   placeholder?: string;
   defaultValue?: string;
   data: SelectDatatype[];
};

export default function AppSelect(props: AppSelectProps) {
   const selectRef = useRef<HTMLButtonElement>(null);

   return (
      <FormField
         control={props.form.control}
         name={props.name || 'status'}
         render={({ field }) => (
            <FormItem>
               <FormLabel>{props.label || 'Default label'}</FormLabel>
               <Select
                  defaultValue={field.value}
                  onValueChange={(e) => {
                     field.onChange(e);

                     if (selectRef.current) {
                        selectRef.current.className =
                           selectRef.current.className.concat(
                              ' dark:text-blue-500 dark:font-bold',
                           );
                     }
                  }}
               >
                  <FormControl>
                     <SelectTrigger ref={selectRef} className="dark:bg-five">
                        <SelectValue
                           placeholder={
                              props.placeholder || 'Default placeholder'
                           }
                        />
                     </SelectTrigger>
                  </FormControl>
                  <SelectContent className="dark:bg-five">
                     {props.data &&
                        props.data.length > 0 &&
                        props.data.map((item, index) => (
                           <SelectItem key={index} value={item.value}>
                              {item.label}
                           </SelectItem>
                        ))}
                  </SelectContent>
               </Select>
               <FormDescription>{props.description || ''}</FormDescription>
               <FormMessage />
            </FormItem>
         )}
      />
   );
}
