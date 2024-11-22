/* eslint-disable react/no-unescaped-entities */
'use client';

import { z } from 'zod';
import { Button } from './ui/button';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '~/hooks/use-toast';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from './ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '~/lib/utils';
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from './ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import * as categoryService from '~/services/categories.service';
import { ApiError } from '~/common/errors/Api.error';
import {
   ICreateCategoryPayload,
   IGetAllCategoriesResponse,
} from '~/types/category.type';
import Loading from './loading';

export const createCategorySchema = z.object({
   name: z.string().min(4),
   parentId: z.string({
      required_error: 'Please select a parent category.',
      message: 'Please select a parent category.',
   }),
});
// .refine(
//    (data) => !data.isNotParent || (data.isNotParent && !!data.parentId),
//    {
//       message:
//          'Please select a parent category when "This is not a parent category" is checked.',
//       path: ['parentId'],
//    },
// );

export default function CreateCategoryModel() {
   const [categories, setCategories] = useState<IGetAllCategoriesResponse[]>(
      [],
   );

   const [loading, setLoading] = useState(false);

   const form = useForm<z.infer<typeof createCategorySchema>>({
      resolver: zodResolver(createCategorySchema),
      defaultValues: {
         name: '',
         parentId: '',
      },
   });

   // const isNotParent = form.watch('isNotParent');

   const onCreateCategory = async (
      data: z.infer<typeof createCategorySchema>,
   ) => {
      setLoading(true);

      // toast({
      //    title: 'Create category payload',
      //    className: 'dark:bg-green-500/60 text-white dark:text-white',
      //    description: (
      //       <pre className="mt-2 w-[340px] rounded-md dark:bg-green-800 p-4">
      //          <code className="text-white">
      //             {JSON.stringify(data, null, 2)}
      //          </code>
      //       </pre>
      //    ),
      // });

      const payload: ICreateCategoryPayload = {
         name: data.name,
         parentId: data.parentId,
      };

      const result = await categoryService.createCategory(payload);
      console.log('result', result);

      if (result instanceof ApiError) {
         console.log(result.errorResponse);

         toast({
            title: `${result.errorResponse?.message}`,
            description: `There was a problem with your request. ${result.errorResponse?.code}`,
            variant: 'destructive',
         });

         setLoading(false);

         return;
      }

      setTimeout(() => {
         setLoading(false);
      }, 500);

      toast({
         title: 'Created successfully',
         description: 'Category created successfully.',
         className: 'dark:bg-green-500/60 text-white dark:text-white',
      });
   };

   useEffect(() => {
      async function fetchData() {
         const result = (await categoryService.getAllCategories()) as
            | IGetAllCategoriesResponse[]
            | ApiError
            | null;

         if (result instanceof ApiError) {
            console.log(result.errorResponse);

            toast({
               variant: 'destructive',
               title: `${result.errorResponse?.message}`,
               description: `There was a problem with your request. ${result.errorResponse?.code}`,
            });

            return;
         }

         const categories = result?.filter(
            (cate) => cate.category_parentId === null,
         ) as IGetAllCategoriesResponse[];

         setCategories(categories as IGetAllCategoriesResponse[]);
      }

      fetchData();
   }, []);

   return (
      <div>
         {loading && <Loading />}
         <Dialog>
            <DialogTrigger asChild>
               <Button
                  variant="outline"
                  className="font-semibold dark:bg-white dark:text-slate-800 dark:hover:bg-slate-700"
               >
                  + Create new
               </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-md">
               <DialogHeader>
                  <DialogTitle>Add new category</DialogTitle>
                  <DialogDescription>
                     Make changes category here. Click save when you're done.
                  </DialogDescription>
               </DialogHeader>

               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onCreateCategory)}
                     className="space-y-6"
                  >
                     <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                           <FormItem className="grid items-center grid-cols-4 gap-4">
                              <FormLabel className="text-right">Name</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    placeholder="Name"
                                    className="col-span-3 rounded-xl"
                                 />
                              </FormControl>
                              <FormMessage className="col-span-4" />
                           </FormItem>
                        )}
                     />

                     {/* <FormField
                        name="isNotParent"
                        control={form.control}
                        render={({ field }) => (
                           <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 shadow-[1.95px_1.95px_2.6px_rgba(0,0,0,0.5)]">
                              <FormControl>
                                 <Checkbox
                                    className="dark:border-[#96acd0]"
                                    checked={field.value}
                                    onCheckedChange={(e) => {
                                       field.onChange(e);
                                    }}
                                 />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                 <FormLabel>
                                    This is not parent category
                                 </FormLabel>
                              </div>
                           </FormItem>
                        )}
                     /> */}

                     <FormField
                        control={form.control}
                        name="parentId"
                        render={({ field }) => (
                           <FormItem className="grid items-center grid-cols-4 gap-4">
                              <FormLabel className="text-right">
                                 Category
                              </FormLabel>
                              <Popover>
                                 <PopoverTrigger asChild>
                                    <FormControl>
                                       <Button
                                          variant="outline"
                                          role="combobox"
                                          className={cn(
                                             'col-span-3 justify-between',
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
                                 <PopoverContent className="w-[200px] p-0">
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
                                                         'parentId',
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
                              <FormMessage className="col-span-4" />
                           </FormItem>
                        )}
                     />

                     <DialogFooter>
                        <Button type="submit">Create</Button>
                     </DialogFooter>
                  </form>
               </Form>
            </DialogContent>
         </Dialog>
      </div>
   );
}
