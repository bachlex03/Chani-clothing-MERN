import { UseFormReturn } from 'react-hook-form';
import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '~/components/ui/form';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';

export type AppColorCheckboxProps = {
   name: string;
   form: UseFormReturn;
   label?: string;
};

export default function AppColorCheckbox(props: AppColorCheckboxProps) {
   return (
      <FormField
         control={props.form.control}
         name={props.name || ''}
         render={({ field }) => (
            <FormItem className="space-y-3">
               <FormControl>
                  <RadioGroup
                     onValueChange={field.onChange}
                     // defaultValue={field.value}
                     className="flex flex-col space-y-1"
                     defaultValue="brown"
                  >
                     <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                           <RadioGroupItem
                              value="brown"
                              className="dark:text-amber-800 dark:border-amber-800"
                           />
                        </FormControl>
                        <FormLabel className="font-bold dark:text-amber-800">
                           brown
                        </FormLabel>
                     </FormItem>
                     <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                           <RadioGroupItem
                              value="grey"
                              className="dark:text-gray-500 dark:border-gray-500"
                           />
                        </FormControl>
                        <FormLabel className="font-bold dark:text-gray-500">
                           Grey
                        </FormLabel>
                     </FormItem>
                     <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                           <RadioGroupItem
                              value="yellow"
                              className="dark:text-yellow-300 dark:border-yellow-300"
                           />
                        </FormControl>
                        <FormLabel className="font-bold dark:text-yellow-300">
                           Yellow
                        </FormLabel>
                     </FormItem>
                     <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                           <RadioGroupItem
                              value="pink"
                              className="dark:text-pink-300 dark:border-pink-300"
                           />
                        </FormControl>
                        <FormLabel className="font-bold dark:text-pink-300">
                           Pink
                        </FormLabel>
                     </FormItem>
                     <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                           <RadioGroupItem
                              value="red"
                              className="dark:text-red-500 dark:border-red-500"
                           />
                        </FormControl>
                        <FormLabel className="font-bold dark:text-red-500">
                           Red
                        </FormLabel>
                     </FormItem>
                  </RadioGroup>
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />
   );
}
