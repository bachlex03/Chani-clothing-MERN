import { UseFormReturn } from 'react-hook-form';
import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '~/components/ui/form';
import { Textarea } from '~/components/ui/textarea';

export type AppTextAreaProps = {
   // Add props here
   name: string;
   form: UseFormReturn;
   label?: string;
   description?: string;
   placeholder?: string;
   defaultValue?: string;
};

export default function AppTextArea(props: AppTextAreaProps) {
   return (
      <FormField
         control={props.form.control}
         name="bio"
         render={({ field }) => (
            <FormItem>
               <FormLabel>{props.label || 'Default label'}</FormLabel>
               <FormControl>
                  <Textarea
                     placeholder={props.placeholder || ''}
                     className="resize-none"
                     {...field}
                  />
               </FormControl>
               <FormDescription>{props.description || ''}</FormDescription>
               <FormMessage />
            </FormItem>
         )}
      />
   );
}
