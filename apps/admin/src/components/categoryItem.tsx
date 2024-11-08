'use client';

import { ScrollArea } from '~/components/ui/scroll-area';
import { Separator } from '~/components/ui/separator';
import { AppCardContent } from './app-card';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { IGetAllCategoriesResponse } from '~/types/categories/get-all.type';
import { use, useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from './ui/form';
import { cn } from '~/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from './ui/command';

export type CategoryItemProps = {
   key: number;
   parentCategory: IGetAllCategoriesResponse;
   categories: IGetAllCategoriesResponse[];
};

export const updateCategorySchema = z.object({
   name: z.string().min(3),
   parentId: z.string({
      required_error: 'Please select a parent category.',
   }),
});

export default function CategoryItem(props: CategoryItemProps) {
   const [child, setChild] = useState<IGetAllCategoriesResponse[]>([]);

   const form = useForm<z.infer<typeof updateCategorySchema>>({
      resolver: zodResolver(updateCategorySchema),
      defaultValues: {
         name: '',
      },
   });

   const listParent = props.categories.filter(
      (category) => category.category_parentId === null,
   );

   const onUpdate = async (values: z.infer<typeof updateCategorySchema>) => {
      console.log(values);
   };

   useEffect(() => {
      const children = props.categories.filter(
         (category) => category.category_parentId === props.parentCategory._id,
      );
      setChild(children);
   }, []);

   return (
      <div className="pb-10" key={props.parentCategory._id}>
         <AppCardContent className="border-none dark:bg-[#1f2e44] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
            <h2 className="font-semibold mb-3">
               {props.parentCategory.category_name}
            </h2>
            <ScrollArea className="h-72 w-full rounded-md border">
               <div className="p-4">
                  <h4 className="mb-4 text-sm font-medium leading-none">
                     Name
                  </h4>
                  {child.map((category, index) => (
                     <div
                        key={index}
                        className="flex justify-between items-center h-10"
                     >
                        <p className="text-sm font-medium">
                           {category.category_name}
                        </p>

                        <Popover>
                           <PopoverTrigger asChild>
                              <Button
                                 variant="outline"
                                 className="text-xs px-3 py-3 dark:bg-five h-6 leading-none"
                              >
                                 Edit
                              </Button>
                           </PopoverTrigger>
                           <PopoverContent className="w-80">
                              <div className="grid gap-4">
                                 <div className="space-y-2">
                                    <h4 className="font-medium leading-none">
                                       Edit category
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                       Edit the category name and parent
                                       category
                                    </p>
                                 </div>
                                 <div className="grid gap-2">
                                    <Form {...form}>
                                       <form
                                          onSubmit={form.handleSubmit(onUpdate)}
                                       >
                                          <FormField
                                             control={form.control}
                                             name="name"
                                             render={({ field }) => (
                                                <FormItem className="grid grid-cols-3 items-center gap-4 mb-5">
                                                   <FormLabel htmlFor="name">
                                                      Name
                                                   </FormLabel>
                                                   <FormControl>
                                                      <Input
                                                         id="name"
                                                         placeholder="Name"
                                                         {...field}
                                                         className="col-span-2 h-8"
                                                      />
                                                   </FormControl>
                                                   <FormMessage className="col-span-3" />
                                                </FormItem>
                                             )}
                                          />

                                          <FormField
                                             control={form.control}
                                             name="parentId"
                                             render={({ field }) => (
                                                <FormItem className="grid grid-cols-3 items-center gap-4 mb-5">
                                                   <FormLabel>Parent</FormLabel>
                                                   <Popover>
                                                      <PopoverTrigger asChild>
                                                         <FormControl>
                                                            <Button
                                                               variant="outline"
                                                               role="combobox"
                                                               className={cn(
                                                                  'w-full justify-between col-span-2 h-8 dark:bg-[#162336]',
                                                                  !field.value &&
                                                                     'text-muted-foreground',
                                                               )}
                                                            >
                                                               {field.value
                                                                  ? listParent.find(
                                                                       (
                                                                          category,
                                                                       ) =>
                                                                          category._id ===
                                                                          field.value,
                                                                    )
                                                                       ?.category_name
                                                                  : 'Select category'}
                                                               <ChevronsUpDown className="opacity-50" />
                                                            </Button>
                                                         </FormControl>
                                                      </PopoverTrigger>
                                                      <PopoverContent className="w-[200px] p-0">
                                                         <Command>
                                                            <CommandInput
                                                               placeholder="Search framework..."
                                                               className="h-9"
                                                            />
                                                            <CommandList>
                                                               <CommandEmpty>
                                                                  No framework
                                                                  found.
                                                               </CommandEmpty>
                                                               <CommandGroup>
                                                                  {listParent.map(
                                                                     (
                                                                        category,
                                                                     ) => (
                                                                        <CommandItem
                                                                           value={
                                                                              category.category_name
                                                                           }
                                                                           key={
                                                                              category._id
                                                                           }
                                                                           onSelect={() => {
                                                                              form.setValue(
                                                                                 'parentId',
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
                                             <Button
                                                className="rounded-3xl mt-2 text-right"
                                                type="submit"
                                             >
                                                Save change
                                             </Button>
                                          </div>
                                       </form>
                                    </Form>
                                 </div>
                              </div>
                           </PopoverContent>
                        </Popover>
                     </div>
                  ))}
               </div>
            </ScrollArea>
         </AppCardContent>
      </div>
   );
}
