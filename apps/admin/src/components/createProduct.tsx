/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { toast } from '~/hooks/use-toast';
import { Button } from './ui/button';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from './ui/form';
import { ScrollArea } from './ui/scroll-area';
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from './ui/sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { any, z } from 'zod';
import AppInput from './app-input';
import AppSelect from '~/components/app-select';
import AppTextArea from '~/components/app-text-area';
import images from '../../public/images';
import Image from 'next/image';
import AppColorCheckbox from '~/components/app-color-checkbox';
import AppSizeCheckbox from '~/components/app-size-checkbox';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { useState } from 'react';

const statusOptions = [
   {
      label: 'Active',
      value: 'active',
   },
   {
      label: 'Inactive',
      value: 'inactive',
   },
];

const brandOptions = [
   {
      label: 'Gucci',
      value: 'gucci',
   },
   {
      label: 'Louis Vuitton',
      value: 'louis-vuitton',
   },
   {
      label: 'Chanel',
      value: 'chanel',
   },
   {
      label: 'Dior',
      value: 'dior',
   },
   {
      label: 'Prada',
      value: 'prada',
   },
];

const categoryOptions = [
   {
      label: 'Active',
      value: 'active',
   },
   {
      label: 'Inactive',
      value: 'inactive',
   },
];

const productTypeOptions = [
   {
      label: 'Clothe',
      value: 'clothe',
   },
   {
      label: 'Trousers',
      value: 'trousers',
   },
   {
      label: 'Shoes',
      value: 'shoes',
   },
];

const genderOptions = [
   {
      label: 'Man',
      value: 'man',
   },
   {
      label: 'Woman',
      value: 'woman',
   },
   {
      label: 'Unisex',
      value: 'unisex',
   },
];

enum sizeEnum {
   S = 'S',
   M = 'M',
   L = 'L',
   XL = 'XL',
   '2XL' = '2XL',
}

enum colorEnum {
   brown = 'brown',
   grey = 'grey',
   yellow = 'yellow',
   pink = 'pink',
   red = 'red',
}

const FormSchema = z.object({
   name: z
      .string()
      .max(40, {
         message: 'Product title must not be exceed 40 characters.',
      })
      .min(2, {
         message: 'Product title must be at least 2 characters.',
      }),
   brand: z.string({
      required_error: 'Please select brand for the product.',
   }),
   status: z.string({
      required_error: 'Please select status for the product.',
   }),
   gender: z.string({
      required_error: 'Please select gender for the product.',
   }),
   type: z.string({
      required_error: 'Please select type for the product.',
   }),
   category: z.string({
      required_error: 'Please select category for the product.',
   }),
   description: z.string({
      required_error: 'Please enter description for the product.',
   }),
   price: z.any().refine((price) => Number(price) > 0, {
      message: 'Price must be at least 1.',
   }),
   quantity: z.any().refine((quantity) => Number(quantity) > 0, {
      message: 'Quantity must be at least 1.',
   }),
   size: z.enum(['S', 'M', 'L', 'XL', '2XL'], {
      required_error: 'You need to select a size for product.',
   }),
   color: z.enum(['brown', 'grey', 'yellow', 'pink', 'red'], {
      required_error: 'You need to select a color for product.',
   }),
});

export default function CreateProductAside() {
   const [name, setName] = useState('');

   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         name: '',
         quantity: 0,
         price: 0,
         size: sizeEnum.S,
         color: colorEnum.brown,
      },
   });

   function onSubmit(data: z.infer<typeof FormSchema>) {
      toast({
         title: 'You submitted the following values:',
         description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
               <code className="text-white">
                  {JSON.stringify(data, null, 2)}
               </code>
            </pre>
         ),
      });
   }

   return (
      <div>
         <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent className="w-[80%] dark:bg-four">
               <SheetHeader>
                  <SheetTitle>Add Product</SheetTitle>
               </SheetHeader>

               <div className="flex justify-between">
                  <div className="w-[70%]">
                     <ScrollArea className="h-[88vh] w-[100%] mt-5 rounded-md border p-4 dark:bg-five">
                        <div className="w-full px-5">
                           <Form {...form}>
                              <form
                                 onSubmit={form.handleSubmit(onSubmit)}
                                 className=" w-full space-y-6"
                              >
                                 <div>
                                    <AppInput
                                       name="name"
                                       form={form as any}
                                       label="Product title"
                                       placeholder="Enter product title"
                                       description="Do not exceed 40 characters when
                                             entering the name."
                                       type="text"
                                    />
                                 </div>

                                 <div className="grid grid-cols-3 gap-5">
                                    <div>
                                       <AppInput
                                          name="code"
                                          placeholder="#GCOWU-3412523"
                                          form={form as any}
                                          label="Product code"
                                          description="Code generated automatically"
                                          type="text"
                                          disabled
                                       />
                                    </div>

                                    <div>
                                       <AppSelect
                                          name="status"
                                          label="Status"
                                          placeholder="Select status"
                                          data={statusOptions}
                                          form={form as any}
                                       />
                                    </div>

                                    <div>
                                       <AppSelect
                                          name="brand"
                                          label="Brand"
                                          placeholder="Select brand"
                                          data={brandOptions}
                                          form={form as any}
                                       />
                                    </div>
                                 </div>

                                 <div className="grid grid-cols-3 gap-5">
                                    <div>
                                       <AppSelect
                                          name="category"
                                          label="Category"
                                          data={categoryOptions}
                                          form={form as any}
                                       />
                                    </div>

                                    <div>
                                       <AppSelect
                                          name="type"
                                          label="Product type"
                                          placeholder="Select product type"
                                          data={productTypeOptions}
                                          form={form as any}
                                       />
                                    </div>

                                    <div>
                                       <AppSelect
                                          name="gender"
                                          label="Gender"
                                          placeholder="Select gender"
                                          data={genderOptions}
                                          form={form as any}
                                       />
                                    </div>
                                 </div>

                                 <div className="grid grid-cols-2">
                                    <div>
                                       <h2 className="mb-5 text-sm font-semibold">
                                          Color Variants
                                       </h2>
                                       <AppColorCheckbox
                                          name="color"
                                          form={form as any}
                                       />
                                    </div>

                                    <div>
                                       <h2 className="mb-5 text-sm font-semibold">
                                          Size Variants
                                       </h2>

                                       <AppSizeCheckbox
                                          name="size"
                                          form={form as any}
                                       />
                                    </div>
                                 </div>

                                 <div>
                                    <AppInput
                                       name="images"
                                       form={form as any}
                                       label="Images"
                                       type="file"
                                    />
                                 </div>

                                 <div>
                                    <AppTextArea
                                       name="description"
                                       label="Product description"
                                       placeholder="Enter product description"
                                       form={form as any}
                                    />
                                 </div>

                                 <div className="grid grid-cols-3 gap-5">
                                    <div className="col-span-1">
                                       <AppInput
                                          name="price"
                                          placeholder="0 $"
                                          description='Price currency is in "$"'
                                          form={form as any}
                                          label="Price"
                                          type="number"
                                       />
                                    </div>

                                    <div className="col-span-1">
                                       <AppInput
                                          name="quantity"
                                          // placeholder="
                                          form={form as any}
                                          label="Quantity"
                                          type="number"
                                       />
                                    </div>
                                 </div>

                                 <div className="w-[100%]">
                                    <Button
                                       type="submit"
                                       className="text-right"
                                    >
                                       Create new
                                    </Button>
                                 </div>
                              </form>
                           </Form>
                        </div>
                     </ScrollArea>
                  </div>

                  <div className="w-[27%]">
                     <ScrollArea className="h-[75%] w-[100%] mt-5 rounded-md border p-4 dark:bg-five">
                        <div className="w-full px-5">
                           <h2 className="font-bold text-xl">
                              Product card preview
                           </h2>

                           <div className="w-[240px] h-[240px] mt-5 rounded-xl bg-[#121f31]">
                              <div className="flex justify-center items-center h-[100%]">
                                 <img
                                    src="https://themesdesign.in/tailwick/html-dark/assets/images/img-03.png"
                                    className="w-[200px] h-[200px]"
                                    alt="sample image"
                                 />
                              </div>
                           </div>

                           <h2 className="mt-5 text-lg font-semibold">
                              $200.99
                           </h2>

                           <h2 className="mt-5 text-lg font-bold">{name}</h2>

                           <p className="text-sm mt-1 text-slate-300 font-medium">
                              Woman's Fashion
                           </p>
                        </div>
                     </ScrollArea>
                  </div>
               </div>
            </SheetContent>
         </Sheet>
      </div>
   );
}