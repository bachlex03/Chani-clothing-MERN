/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Loading from '~/components/loading';
import { Button } from '~/components/ui/button';
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
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '~/components/ui/dialog';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '~/components/ui/popover';
import { toast } from '~/hooks/use-toast';
import { cn } from '~/lib/utils';
import { IGetAllCategoriesResponse } from '~/types/categories/get-all.type';
import * as promotionServices from '~/services/promotions.service';
import * as categoryServices from '~/services/categories/categories.service';

import { ApiError } from '~/common/errors/Api.error';

export type PromotionDialogProps = {
   id: string;
   name: string;
   value: string;
   startDate: string;
   endDate: string;
};

export const UpdatePromotionSchema = z.object({
   id: z.string().min(3),
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
      .refine((date) => new Date(date))
      .transform((date) => {
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

export default function PromotionDialog(props: PromotionDialogProps) {
   const [loading, setLoading] = useState(false);

   const [categories, setCategories] = useState<IGetAllCategoriesResponse[]>(
      [],
   );

   useEffect(() => {
      async function getAllCategories() {
         const result = (await categoryServices.getAllCategories()) as
            | IGetAllCategoriesResponse[]
            | ApiError
            | null;

         if (result instanceof ApiError) {
            console.log(result.errorResponse);

            toast({
               variant: 'destructive',
               title: `Account ${result.errorResponse?.message}`,
               description: `There was a problem with your request. ${result.errorResponse?.code}`,
            });

            return;
         }

         const categories = result?.filter(
            (cate) => cate.category_parentId !== null,
         ) as IGetAllCategoriesResponse[];

         setCategories(categories as IGetAllCategoriesResponse[]);

         setTimeout(() => {
            // setLoading(false);
         }, 500);
      }

      getAllCategories();
   }, []);

   const form = useForm<z.infer<typeof UpdatePromotionSchema>>({
      resolver: zodResolver(UpdatePromotionSchema),
   });

   const onUpdate = async (data: z.infer<typeof UpdatePromotionSchema>) => {
      setLoading(true);

      console.log('data', data);

      const result = await promotionServices.updatePromotion('', data);

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

   useEffect(() => {
      form.setValue('id', props.id);
      form.setValue('name', props.name);
      form.setValue('value', Number(props.value));
      form.setValue('startDate', new Date(props.startDate) as any);
      form.setValue('endDate', new Date(props.endDate) as any);
   }, []);

   return (
      <div>
         <DialogContent className="rounded-lg dark:bg-four">
            {loading && <Loading />}
            <DialogHeader className="">
               <DialogTitle className="text-base">Edit promotion</DialogTitle>
            </DialogHeader>
            <div className="p-5 rounded-md bg-five">
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onUpdate)}>
                     <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                           <FormItem className="grid items-center grid-cols-3 gap-4 mb-5">
                              <FormLabel htmlFor="id">Name</FormLabel>
                              <FormControl>
                                 <Input
                                    id="id"
                                    {...field}
                                    className="h-8 col-span-2"
                                    type="hidden"
                                 />
                              </FormControl>
                              <FormMessage className="col-span-3" />
                           </FormItem>
                        )}
                     />

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
                                    value={props.value}
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
                                          ) : props.startDate ? (
                                             <span>{props.startDate}</span>
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
                                       selected={
                                          new Date(props.startDate as any) ??
                                          (field.value as any)
                                       }
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
                                          ) : props.startDate ? (
                                             <span>{props.endDate}</span>
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
                                             ? categories.find(
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
                                             {categories.map((category) => (
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
                                                   {category.category_name}
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
                                             ))}
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
                        <Button type="submit">Save changes</Button>
                     </div>
                  </form>
               </Form>
            </div>
            <DialogFooter></DialogFooter>
         </DialogContent>
      </div>
   );
}
