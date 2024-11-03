import { UseFormReturn } from 'react-hook-form';
import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '~/components/ui/form';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';

export type AppSizeCheckboxProps = {
   name: string;
   form: UseFormReturn;
   label?: string;
};

export default function AppSizeCheckbox(props: AppSizeCheckboxProps) {
   return (
      <FormField
         control={props.form.control}
         name={props.name || ''}
         render={({ field }) => (
            <FormItem className="space-y-3">
               <FormControl>
                  <RadioGroup
                     onValueChange={field.onChange}
                     defaultValue={field.value}
                     className="flex flex-col space-y-1"
                     // defaultValue="S"
                  >
                     <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                           <RadioGroupItem value="S" />
                        </FormControl>
                        <FormLabel className="font-bold">Size S</FormLabel>
                     </FormItem>
                     <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                           <RadioGroupItem value="M" />
                        </FormControl>
                        <FormLabel className="font-bold">Size M</FormLabel>
                     </FormItem>
                     <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                           <RadioGroupItem value="L" />
                        </FormControl>
                        <FormLabel className="font-bold">Size L</FormLabel>
                     </FormItem>
                     <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                           <RadioGroupItem value="XL" />
                        </FormControl>
                        <FormLabel className="font-bold">Size XL</FormLabel>
                     </FormItem>
                     <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                           <RadioGroupItem value="2XL" />
                        </FormControl>
                        <FormLabel className="font-bold">Size 2XL</FormLabel>
                     </FormItem>
                  </RadioGroup>
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />
   );
}
