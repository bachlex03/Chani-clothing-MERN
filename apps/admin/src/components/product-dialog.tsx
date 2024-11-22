/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '~/components/ui/button';

import {
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogFooter,
} from './ui/dialog';

import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '~/hooks/use-toast';
import { ScrollArea } from './ui/scroll-area';
import { Form } from './ui/form';
import AppInput from './app-input';
import AppSelect from './app-select';
import AppTextArea from './app-text-area';
import { IGetAllCategoriesResponse } from '~/types/category.type';
import { ApiError } from '~/common/errors/Api.error';
import * as categoryServices from '~/services/categories.service';
import Loading from './loading';
import * as productServices from '~/services/products.service';
import { IUpdateProductPayload } from '~/types/product.type';

const statusOptions = [
   {
      label: 'Draft',
      value: 'Draft',
   },
   {
      label: 'Published',
      value: 'Published',
   },
];

const brandOptions = [
   {
      label: 'Gucci',
      value: 'Gucci',
   },
   {
      label: 'Louis Vuitton',
      value: 'Louis Vuitton',
   },
   {
      label: 'Chanel',
      value: 'Chanel',
   },
   {
      label: 'Dior',
      value: 'Dior',
   },
   {
      label: 'Prada',
      value: 'Prada',
   },
];

const productTypeOptions = [
   {
      label: 'Clothe',
      value: 'Clothe',
   },
   {
      label: 'Trousers',
      value: 'Trousers',
   },
   {
      label: 'Shoes',
      value: 'Shoes',
   },
];

const genderOptions = [
   {
      label: 'Man',
      value: 'Man',
   },
   {
      label: 'Woman',
      value: 'Woman',
   },
   {
      label: 'Unisex',
      value: 'Unisex',
   },
];

const ColorsHash = {
   BROWN: '#422006',
   RED: '#dc2626',
   GREY: '#808080',
   YELLOW: '#ffff00',
   PINK: '#ffc0cb',
};

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
});

export type ProductDialogProps = {
   id: string;
   name: string;
   description: string;
   price: number;
   status: string;
   brand: string;
   category: string;
   categoryId: string;
   type: string;
   gender: string;
   product_sizes: string[];
   product_colors: string[];
   imageUrl: string;
   reloadFunction: () => void;
};

export default function ProductDialog(props: ProductDialogProps) {
   const [name, setName] = useState(props.name);
   const [description, setDescription] = useState(props.description);
   const [price, SetPrice] = useState(props.price);

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
               title: `${result.errorResponse?.message}`,
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

   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
   });

   async function onUpdate(data: z.infer<typeof FormSchema>) {
      setLoading(true);

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

      const payload: IUpdateProductPayload = {
         name: data.name,
         description: data.description,
         price: data.price,
         status: data.status,
         brand: data.brand,
         categoryId: data.category,
         gender: data.gender,
         type: data.type,
      };

      const result = await productServices.updateProduct(props.id, payload);

      if (result instanceof ApiError) {
         toast({
            title: 'Product update failed',
            description: 'Product update failed. Please try again.',
            variant: 'destructive',
         });

         setLoading(false);
         return;
      }

      setTimeout(() => {
         setLoading(false);
      }, 500);

      toast({
         title: 'Product updated successfully',
         description: 'Product has been updated successfully.',
         className: 'bg-green-300',
      });

      props.reloadFunction();
   }

   useEffect(() => {
      form.setValue('name', props.name);
      form.setValue('description', props.description);
      form.setValue('status', props.status);
      form.setValue('brand', props.brand);
      form.setValue('category', props.categoryId);
      form.setValue('type', props.type);
      form.setValue('gender', props.gender);
      form.setValue('price', props.price);
   }, []);

   return (
      <DialogContent className="w-[85%] h-[85%] rounded-lg">
         {loading && <Loading />}
         <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
         </DialogHeader>
         <div className="">
            <div className="flex justify-between">
               <div className="w-[70%]">
                  <ScrollArea className="h-[72vh] w-[100%] mt-5 rounded-md border p-4 dark:bg-five">
                     <div className="w-full px-5">
                        <Form {...form}>
                           <form
                              onSubmit={form.handleSubmit(onUpdate)}
                              className="w-full space-y-6 "
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
                                    value={name}
                                    setValue={setName}
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
                                       defaultValue={props.status}
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
                                       data={categories.map((cate) => ({
                                          label: cate.category_name,
                                          value: cate._id,
                                       }))}
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
                                 <AppTextArea
                                    name="description"
                                    label="Product description"
                                    placeholder="Enter product description"
                                    form={form as any}
                                    value={description}
                                    setValue={setDescription}
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
                                       value={price}
                                       setValue={SetPrice}
                                    />
                                 </div>
                              </div>

                              <div className="w-[100%] flex justify-end">
                                 <Button type="submit" className="text-right">
                                    Update
                                 </Button>
                              </div>
                           </form>
                        </Form>
                     </div>
                  </ScrollArea>
               </div>

               <div className="w-[27%]">
                  <ScrollArea className="h-[80%] w-[100%] mt-5 rounded-md border p-4 dark:bg-five">
                     <div className="flex flex-col items-center w-full px-5">
                        <h2 className="text-xl font-bold">
                           Product card preview
                        </h2>

                        <div className="w-[240px] h-[240px] mt-5 rounded-xl bg-[#121f31]">
                           <div className="flex justify-center items-center h-[100%]">
                              <img
                                 src={
                                    props.imageUrl ||
                                    'https://themesdesign.in/tailwick/html-dark/assets/images/img-03.png'
                                 }
                                 className="w-[200px] h-[200px]"
                                 alt="sample image"
                              />
                           </div>
                        </div>

                        <h2 className="self-start mt-5 text-lg font-semibold">
                           ${price || 200.99}
                        </h2>

                        <h2 className="self-start mt-2 text-lg font-bold">
                           {name || 'Default product name'}
                        </h2>

                        <p className="self-start mt-1 text-sm font-medium text-slate-300">
                           Woman's Fashion
                        </p>

                        <p className="self-start mt-2 text-xs font-medium">
                           Colors
                        </p>
                        <span className="flex self-start">
                           {props.product_colors.map((color, index) => (
                              <span
                                 key={index}
                                 className="w-6 h-6 mt-2 mr-2 text-xs border rounded-md"
                                 style={{
                                    backgroundColor:
                                       ColorsHash[
                                          color.toUpperCase() as keyof typeof ColorsHash
                                       ],
                                 }}
                              ></span>
                           ))}
                        </span>

                        <p className="self-start mt-2 text-xs font-medium">
                           Sizes
                        </p>
                        <span className="flex self-start">
                           {props.product_sizes.map((size, index) => (
                              <span
                                 key={index}
                                 className="self-start px-2 py-1 mt-2 mr-2 text-xs border rounded-md"
                              >
                                 {size}
                              </span>
                           ))}
                        </span>

                        <p className="self-start mt-5 text-sm dark:text-slate-400">
                           {description ||
                              'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis odio voluptatibus,tenetur totam obcaecati minima tempora nul porro! Fuga, id'}
                        </p>
                     </div>
                  </ScrollArea>
               </div>
            </div>
         </div>
         <DialogFooter></DialogFooter>
      </DialogContent>
   );
}
