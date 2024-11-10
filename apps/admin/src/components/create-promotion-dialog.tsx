/* eslint-disable @typescript-eslint/no-explicit-any */
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '~/components/ui/popover';
import { cn } from '~/lib/utils';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { Calendar } from '~/components/ui/calendar';
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from '~/components/ui/command';

import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '~/components/ui/dialog';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '~/components/ui/form';

import { Button } from '~/components/ui/button';
import { format } from 'date-fns';
import { Input } from '~/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { ApiError } from '~/common/errors/Api.error';
import * as promotionServices from '~/services/promotions.service';
import { toast } from '~/hooks/use-toast';
import { IGetAllCategoriesResponse } from '~/types/categories/get-all.type';
import Loading from '~/components/loading';

export const CreatePromotionSchema = z.object({
   name: z.string().min(3),
   value: z
      .any()
      .refine((price) => Number(price) > 0, {
         message: 'Discount rate must be at least 1.',
      })
      .refine((price) => Number(price) <= 100, {
         message: 'Discount rate do not exceed 100',
      })
      .transform((value) => Number(value)),
   startDate: z
      .date({
         required_error: 'A date of birth is required.',
      })
      .transform((date) => {
         console.log(date);

         const newDate = new Date(date);

         const isoFormatWithOffset = newDate
            .toISOString()
            .replace('Z', '+07:00');

         return isoFormatWithOffset;
      }),
   endDate: z
      .date({
         required_error: 'A date of birth is required.',
      })
      .transform((date) => {
         const newDate = new Date(date);

         const isoFormatWithOffset = newDate
            .toISOString()
            .replace('Z', '+07:00');

         return isoFormatWithOffset;
      }),
   categoryId: z.string({
      required_error: 'Please select a parent category.',
   }),
});

export type PromotionProps = {
   categories: IGetAllCategoriesResponse[];
};

export default function CreatePromotionDialog(props: PromotionProps) {
   const [loading, setLoading] = useState(false);

   const form = useForm<z.infer<typeof CreatePromotionSchema>>({
      resolver: zodResolver(CreatePromotionSchema),
      defaultValues: {
         name: '',
         value: 0,
      },
   });

   const onCreate = async (data: z.infer<typeof CreatePromotionSchema>) => {
      setLoading(true);

      const result = await promotionServices.createPromotion(data);

      if (result instanceof ApiError) {
         console.log(result.errorResponse);

         toast({
            variant: 'destructive',
            title: `Account ${result.errorResponse?.message}`,
            description: `There was a problem with your request. ${result.errorResponse?.code}`,
         });

         setLoading(false);

         return;
      }

      toast({
         title: 'Login successful',
         className: 'text-white dark:text-white',
         description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
               <code className="text-white">
                  {JSON.stringify(data, null, 2)}
               </code>
            </pre>
         ),
      });

      setTimeout(() => {
         setLoading(false);
      }, 500);
   };

   return (
      <div>
         {loading && <Loading className="bg-five/50" />}
         <Dialog>
            <DialogTrigger asChild>
               <Button className="px-3 py-2 text-sm font-semibold rounded-md dark:bg-white dark:text-four">
                  + Add new
               </Button>
            </DialogTrigger>
            <DialogContent className="rounded-lg dark:bg-four">
               <DialogHeader className="">
                  <DialogTitle className="text-base">
                     Create new promotion
                  </DialogTitle>
               </DialogHeader>
               <div className="p-5 rounded-md bg-five">
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onCreate)}>
                        <FormField
                           control={form.control}
                           name="name"
                           render={({ field }) => (
                              <FormItem className="grid items-center grid-cols-3 gap-4 mb-5">
                                 <FormLabel htmlFor="name">Name</FormLabel>
                                 <FormControl>
                                    <Input
                                       id="name"
                                       placeholder="Name"
                                       {...field}
                                       className="h-8 col-span-2"
                                    />
                                 </FormControl>
                                 <FormMessage className="col-span-3" />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="value"
                           render={({ field }) => (
                              <FormItem className="grid items-center grid-cols-3 gap-4 mb-5">
                                 <FormLabel htmlFor="discountRate">
                                    Discount rate
                                 </FormLabel>
                                 <FormControl>
                                    <Input
                                       id="discountRate"
                                       placeholder="rate %"
                                       type="number"
                                       {...field}
                                       className="h-8 col-span-2"
                                    />
                                 </FormControl>
                                 <FormMessage className="col-span-3" />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="startDate"
                           render={({ field }) => (
                              <FormItem className="grid items-center grid-cols-3 gap-4 mb-5">
                                 <FormLabel>Start From</FormLabel>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                       <FormControl>
                                          <Button
                                             variant={'outline'}
                                             className={cn(
                                                'w-[240px] pl-3 text-left font-normal col-span-2 dark:bg-five dark:border-slate-300/50',
                                                !field.value &&
                                                   'text-muted-foreground',
                                             )}
                                          >
                                             {field.value ? (
                                                format(field.value, 'PPP')
                                             ) : (
                                                <span>Pick a date</span>
                                             )}
                                             <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                          </Button>
                                       </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                       className="w-auto p-0"
                                       align="start"
                                    >
                                       <Calendar
                                          mode="single"
                                          selected={field.value as any}
                                          onSelect={field.onChange}
                                          initialFocus
                                       />
                                    </PopoverContent>
                                 </Popover>
                                 <FormMessage className="col-span-3" />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="endDate"
                           render={({ field }) => (
                              <FormItem className="grid items-center grid-cols-3 gap-4 mb-5">
                                 <FormLabel>End to</FormLabel>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                       <FormControl>
                                          <Button
                                             variant={'outline'}
                                             className={cn(
                                                'w-[240px] pl-3 text-left font-normal col-span-2 dark:bg-five dark:border-slate-300/50',
                                                !field.value &&
                                                   'text-muted-foreground',
                                             )}
                                          >
                                             {field.value ? (
                                                format(field.value, 'PPP')
                                             ) : (
                                                <span>Pick a date</span>
                                             )}
                                             <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                          </Button>
                                       </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                       className="w-auto p-0"
                                       align="start"
                                    >
                                       <Calendar
                                          mode="single"
                                          selected={field.value as any}
                                          onSelect={field.onChange}
                                          initialFocus
                                       />
                                    </PopoverContent>
                                 </Popover>
                                 <FormMessage className="col-span-3" />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="categoryId"
                           render={({ field }) => (
                              <FormItem className="grid items-center grid-cols-3 gap-4 mb-5">
                                 <FormLabel>For Category</FormLabel>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                       <FormControl>
                                          <Button
                                             variant="outline"
                                             role="combobox"
                                             className={cn(
                                                'justify-between col-span-2 w-full',
                                                !field.value &&
                                                   'text-muted-foreground',
                                             )}
                                          >
                                             {field.value
                                                ? props.categories.find(
                                                     (category) =>
                                                        category._id ===
                                                        field.value,
                                                  )?.category_name
                                                : 'Select category'}
                                             <ChevronsUpDown className="opacity-50" />
                                          </Button>
                                       </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                       <Command>
                                          <CommandInput
                                             placeholder="Search framework..."
                                             className="h-9"
                                          />
                                          <CommandList>
                                             <CommandEmpty>
                                                No framework found.
                                             </CommandEmpty>
                                             <CommandGroup>
                                                {props.categories.map(
                                                   (category) => (
                                                      <CommandItem
                                                         value={
                                                            category.category_name
                                                         }
                                                         key={category._id}
                                                         onSelect={() => {
                                                            form.setValue(
                                                               'categoryId',
                                                               category._id,
                                                            );
                                                         }}
                                                      >
                                                         {
                                                            category.category_name
                                                         }
                                                         <Check
                                                            className={cn(
                                                               'ml-auto',
                                                               category._id ===
                                                                  field.value
                                                                  ? 'opacity-100'
                                                                  : 'opacity-0',
                                                            )}
                                                         />
                                                      </CommandItem>
                                                   ),
                                                )}
                                             </CommandGroup>
                                          </CommandList>
                                       </Command>
                                    </PopoverContent>
                                 </Popover>
                                 <FormMessage className="col-span-3" />
                              </FormItem>
                           )}
                        />

                        <div className="flex justify-end">
                           <Button type="submit">Create</Button>
                        </div>
                     </form>
                  </Form>
               </div>
               <DialogFooter></DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   );
}
