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
   return (
      <FormField
         control={props.form.control}
         name={props.name || ''}
         render={({ field }) => (
            <FormItem>
               <FormLabel>{props.label || 'Default label'}</FormLabel>
               <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
               >
                  <FormControl>
                     <SelectTrigger>
                        <SelectValue
                           placeholder={
                              props.placeholder || 'Default placeholder'
                           }
                        />
                     </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
