/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { toast } from '~/hooks/use-toast';
import { Button } from './ui/button';
import { Form } from './ui/form';
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
import { z } from 'zod';
import AppInput from './app-input';
import AppSelect from '~/components/app-select';
import AppTextArea from '~/components/app-text-area';
import images from '../../public/images';

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

const FormSchema = z.object({
   name: z
      .string()
      .max(40, {
         message: 'Product title must not be exceed 40 characters.',
      })
      .min(2, {
         message: 'Product title must be at least 2 characters.',
      }),
   description: z.string().min(2, {
      message: 'Product description must be at least 2 characters..',
   }),
   images: z.string().min(2, {
      message: 'Product description must be at least 2 characters',
   }),
   gender: z.string().min(2, {
      message: 'Product description must be at least 2 characters..',
   }),
   type: z.string().min(2, {
      message: 'Product description must be at least 2 characters..',
   }),
   brand: z.string().min(2, {
      message: 'Product description must be at least 2 characters..',
   }),
   categoryId: z.string().min(2, {
      message: 'Product description must be at least 2 characters..',
   }),
   category: z.string().min(2, {
      message: 'Product description must be at least 2 characters..',
   }),
   color: z.string().min(1, {
      message: 'Product quantity must be at least 1.',
   }),
   price: z
      .number()
      .min(2, {
         message: 'Product description must be at least 2 characters..',
      })
      .default(0),
   quantity: z
      .number()
      .min(1, {
         message: 'Product quantity must be at least 1.',
      })
      .default(1),
   status: z.string().min(2, {
      message: 'Product description must be at least 2 characters..',
   }),
});

export default function CreateProductAside() {
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         name: '',
         description: '',
         images: '',
         gender: '',
         type: '',
         brand: '',
         categoryId: '',
         category: '',
         color: '',
         price: 0,
         quantity: 1,
         status: '',
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
            <SheetContent className="w-[80%]">
               <SheetHeader>
                  <SheetTitle>Add Product</SheetTitle>
               </SheetHeader>

               <div className="flex justify-between">
                  <div className="w-[70%]">
                     <ScrollArea className="h-[75%] w-[100%] mt-5 rounded-md border p-4">
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
                                          data={[]}
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
                                          placeholder="0$"
                                          description='Price currency is in "$"'
                                          form={form as any}
                                          label="Price"
                                          type="number"
                                       />
                                    </div>

                                    <div className="col-span-1">
                                       <AppInput
                                          name="quantity"
                                          placeholder="0"
                                          form={form as any}
                                          label="Quantity"
                                          type="number"
                                       />
                                    </div>
                                 </div>

                                 <Button type="submit">Submit</Button>
                              </form>
                           </Form>
                        </div>
                     </ScrollArea>
                  </div>

                  <div className="w-[27%]">
                     <ScrollArea className="h-[75%] w-[100%] mt-5 rounded-md border p-4">
                        <div className="w-full px-5"></div>
                     </ScrollArea>
                  </div>
               </div>
            </SheetContent>
         </Sheet>
      </div>
   );
}
