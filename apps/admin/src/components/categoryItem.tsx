'use client';

import { ScrollArea } from '~/components/ui/scroll-area';
import { Separator } from '~/components/ui/separator';
import { AppCardContent } from './app-card';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
   IGetAllCategoriesResponse,
   IUpdateCategoryPayload,
} from '~/types/category.type';
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
import { toast } from '~/hooks/use-toast';
import * as categoryService from '~/services/categories.service';
import { ApiError } from '~/common/errors/Api.error';
import Loading from './loading';

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
   const [loading, setLoading] = useState(false);

   const form = useForm<z.infer<typeof updateCategorySchema>>({
      resolver: zodResolver(updateCategorySchema),
      defaultValues: {
         name: '',
      },
   });

   const listParent = props.categories.filter(
      (category) => category.category_parentId === null,
   );

   const onUpdate = async (
      id: string,
      data: z.infer<typeof updateCategorySchema>,
   ) => {
      setLoading(true);

      toast({
         title: 'Create category payload',
         className: 'dark:bg-green-500/60 text-white dark:text-white',
         description: (
            <pre className="mt-2 w-[340px] rounded-md dark:bg-green-800 p-4">
               <code className="text-white">
                  {JSON.stringify(data, null, 2)}
               </code>
            </pre>
         ),
      });

      const payload: IUpdateCategoryPayload = {
         name: data.name,
         parentId: data.parentId,
      };
      const result = await categoryService.updateCategory(id, payload);
      console.log('result', result);

      if (result instanceof ApiError) {
         console.log(result.errorResponse);

         setLoading(false);

         toast({
            title: `Account ${result.errorResponse?.message}`,
            description: `There was a problem with your request. ${result.errorResponse?.code}`,
            variant: 'destructive',
         });

         return;
      }

      setTimeout(() => {
         setLoading(false);
      }, 500);

      toast({
         title: 'Update category',
         description: 'Category updated successfully.',
         className: 'dark:bg-green-500/60 text-white dark:text-white',
      });
   };

   const onDelete = async (id: string) => {
      setLoading(true);

      const result = await categoryService.deleteCategory(id);
      console.log('result', result);

      if (result instanceof ApiError) {
         setLoading(false);

         toast({
            title: `Account ${result.errorResponse?.message}`,
            description: `There was a problem with your request. ${result.errorResponse?.code}`,
            variant: 'destructive',
         });
         return;
      }

      setTimeout(() => {
         setLoading(false);
      }, 500);

      toast({
         title: 'Delete category',
         description: 'Category deleted successfully.',
         className: 'dark:bg-green-500/60 text-white dark:text-white',
      });
   };

   useEffect(() => {
      const children = props.categories.filter(
         (category) => category.category_parentId === props.parentCategory._id,
      );

      setChild(children);
   }, []);

   return (
      <div className="pb-10" key={props.parentCategory._id}>
         {loading && <Loading />}

         <AppCardContent className="border-none dark:bg-[#1f2e44] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
            <h2 className="mb-3 font-semibold">
               {props.parentCategory.category_name}
            </h2>
            <ScrollArea className="w-full border rounded-md h-72">
               <div className="p-4">
                  <h4 className="mb-4 text-sm font-medium leading-none">
                     Name
                  </h4>
                  {child.map((category, index) => (
                     <div
                        key={index}
                        className="flex items-center justify-between h-10"
                     >
                        <p className="text-sm font-medium">
                           {category.category_name}
                        </p>

                        <Popover>
                           <PopoverTrigger asChild>
                              <Button
                                 variant="outline"
                                 className="h-6 px-3 py-3 text-xs leading-none dark:bg-five"
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
                                          onSubmit={form.handleSubmit(() => {
                                             onUpdate(
                                                category._id,
                                                form.getValues(),
                                             );
                                          })}
                                       >
                                          <FormField
                                             control={form.control}
                                             name="name"
                                             render={({ field }) => (
                                                <FormItem className="grid items-center grid-cols-3 gap-4 mb-5">
                                                   <FormLabel htmlFor="name">
                                                      Name
                                                   </FormLabel>
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
                                             name="parentId"
                                             render={({ field }) => (
                                                <FormItem className="grid items-center grid-cols-3 gap-4 mb-5">
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
                                                onClick={() =>
                                                   onDelete(category._id)
                                                }
                                                type="button"
                                                className="mt-2 mr-3 text-right rounded-3xl dark:bg-red-700/80 dark:hover:bg-red-700 dark:text-white"
                                             >
                                                Delete
                                             </Button>
                                             <Button
                                                className="mt-2 text-right rounded-3xl"
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
