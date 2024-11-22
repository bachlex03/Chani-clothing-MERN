/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { toast } from '~/hooks/use-toast';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
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
import AppColorCheckbox from '~/components/app-color-checkbox';
import AppSizeCheckbox from '~/components/app-size-checkbox';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Checkbox } from './ui/checkbox';
import * as cloudinaryService from '~/services/cloudinary.service';
import { ICloudinaryResponse, IImageResponse } from '~/types/cloudinary.type';
import { ApiError } from '~/common/errors/Api.error';
import { IGetAllCategoriesResponse } from '~/types/category.type';
import * as categoryServices from '~/services/categories.service';
import * as productServices from '~/services/products.service';
import Loading from './loading';
import { ICreateProductPayload, IProductImage } from '~/types/product.type';
import AppUploadDialog from '~/components/app-upload-dialog';
import { IoReloadCircleSharp } from 'react-icons/io5';

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

enum sizeEnum {
   S = 'S',
   M = 'M',
   L = 'L',
   XL = 'XL',
   '2XL' = '2XL',
}

enum colorEnum {
   brown = 'Brown',
   grey = 'Grey',
   yellow = 'Yellow',
   pink = 'Pink',
   red = 'Red',
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
   images: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
   }),
   price: z
      .any()
      .refine((price) => Number(price) > 0, {
         message: 'Price must be greater than 0$.',
      })
      .transform((value) => Number(value)),
   quantity: z
      .any()
      .refine((quantity) => Number(quantity) > 0, {
         message: 'Quantity must be at least 1.',
      })
      .transform((value) => Number(value)),
   size: z.enum(['S', 'M', 'L', 'XL', '2XL'], {
      required_error: 'You need to select a size for product.',
   }),
   color: z.enum(['Brown', 'Grey', 'Yellow', 'Pink', 'Red'], {
      required_error: 'You need to select a color for product.',
   }),
});

export default function CreateProductAside() {
   const [name, setName] = useState('');
   const [imagePreview, setImagePreview] = useState<string>('');
   const [description, setDescription] = useState('');
   const [price, SetPrice] = useState(0);
   const [quantity, setQuantity] = useState(0);
   const [images, setImages] = useState<IImageResponse[]>([]);
   const [categories, setCategories] = useState<IGetAllCategoriesResponse[]>(
      [],
   );
   const [loading, setLoading] = useState(false);

   const triggerBtnRef = useRef<HTMLButtonElement>(null);

   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         name: '',
         quantity: 0,
         price: 0,
         size: sizeEnum.S,
         color: colorEnum.brown,
         images: [],
      },
   });

   async function onSubmit(data: z.infer<typeof FormSchema>) {
      setLoading(true);

      // toast({
      //    title: 'You submitted the following values:',
      //    description: (
      //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //          <code className="text-white">
      //             {JSON.stringify(data, null, 2)}
      //          </code>
      //       </pre>
      //    ),
      // });

      const payload: ICreateProductPayload = {
         name: data.name,
         description: data.description,
         gender: data.gender,
         type: data.type,
         brand: data.brand,
         images: data.images.map((img) => {
            return {
               secure_url: img,
               public_id: images.find((image) => image.secure_url === img)
                  ?.public_id,
            } as IProductImage;
         }),
         categoryId: data.category,
         category: data.category,
         sizes: [data.size],
         color: data.color,
         price: data.price.toString(),
         quantity: data.quantity.toString(),
         status: data.status,
      };

      const result = await productServices.createProduct(payload);

      if (result instanceof ApiError) {
         setLoading(false);

         return toast({
            title: 'Error',
            description: result.message,
            variant: 'destructive',
         });
      }

      toast({
         title: 'Created successfully',
         description: 'Product created successfully.',
         className: 'dark:bg-green-500/60 text-white dark:text-white',
      });

      setTimeout(() => {
         setLoading(false);
         document.location.reload();
      }, 500);
   }

   const reloadImages = async () => {
      setLoading(true);

      const response = (await cloudinaryService.getAllImages()) as
         | ICloudinaryResponse
         | ApiError;

      if (response instanceof ApiError) {
         setLoading(false);
         return toast({
            title: 'Error',
            description: response.message,
            variant: 'destructive',
         });
      }

      setLoading(false);

      setImages(response.resources);
   };

   useEffect(() => {
      const fetchingImages = async () => {
         const response = (await cloudinaryService.getAllImages()) as
            | ICloudinaryResponse
            | ApiError;

         if (response instanceof ApiError) {
            return toast({
               title: 'Error',
               description: response.message,
               variant: 'destructive',
            });
         }

         setImages(response.resources);
      };

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

         setCategories(
            categories.filter((cate) => cate.category_parentId !== null),
         );

         setTimeout(() => {
            setLoading(false);
         }, 500);
      }

      getAllCategories();

      fetchingImages();
   }, []);

   return (
      <div>
         {loading && <Loading />}

         <Sheet>
            <SheetTrigger ref={triggerBtnRef}></SheetTrigger>
            <Button
               className="px-3 py-2 text-sm font-semibold rounded-md dark:bg-white dark:text-four"
               onClick={() => {
                  if (triggerBtnRef.current) triggerBtnRef.current?.click();
               }}
            >
               + Add new
            </Button>
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

                                 <div className="">
                                    <span className="flex items-center gap-5">
                                       <h2 className="text-sm font-semibold">
                                          Product images
                                       </h2>
                                       <div
                                          className="inline-block px-2 py-1 text-xs rounded-md cursor-pointer bg-blue-700/40 hover:bg-blue-700 h-7"
                                          onClick={() => {
                                             reloadImages();
                                          }}
                                       >
                                          <span className="flex items-center justify-center">
                                             <i className="flex items-center justify-center">
                                                <IoReloadCircleSharp className="mr-3 text-xl font-bold text-slate-50" />
                                             </i>
                                             <p className="font-medium text-slate-50">
                                                Reload
                                             </p>
                                          </span>
                                       </div>
                                    </span>
                                    <AppUploadDialog />
                                    <div className="mt-5 border rounded-md dark:border-slate-500/50">
                                       <ScrollArea className="rounded-md min-h-[250px] max-h-[500px] overflow-y-auto">
                                          <div className="">
                                             {/* <div className="p-3 bg-[#1f2e44] rounded-md">
                                                <div className="relative h-[200px]">
                                                   <Image
                                                      src="https://res.cloudinary.com/djiju7xcq/image/upload/v1729839380/Sunflower-Jumpsuit-1-690x875_dibawa.webp"
                                                      alt="project"
                                                      layout="fill"
                                                      objectFit="contain"
                                                   />
                                                </div>
                                             </div> */}

                                             <FormField
                                                control={form.control}
                                                name="images"
                                                render={() => (
                                                   <FormItem className="grid grid-cols-3 gap-5 p-3">
                                                      {images.map((item) => (
                                                         <FormField
                                                            key={item.public_id}
                                                            control={
                                                               form.control
                                                            }
                                                            name="images"
                                                            render={({
                                                               field,
                                                            }) => {
                                                               return (
                                                                  <FormItem
                                                                     className="relative"
                                                                     key={
                                                                        item.public_id
                                                                     }
                                                                  >
                                                                     <FormControl className="">
                                                                        <Checkbox
                                                                           className="absolute z-10 left-7 top-5"
                                                                           checked={field.value?.includes(
                                                                              item.secure_url,
                                                                           )}
                                                                           onCheckedChange={(
                                                                              checked,
                                                                           ) => {
                                                                              const imageArr =
                                                                                 form.watch(
                                                                                    'images',
                                                                                 );

                                                                              const notEmptyArr =
                                                                                 checked
                                                                                    ? item.secure_url
                                                                                    : '';

                                                                              if (
                                                                                 checked
                                                                              ) {
                                                                                 setImagePreview(
                                                                                    notEmptyArr,
                                                                                 );
                                                                              } else if (
                                                                                 imageArr.length ===
                                                                                 1
                                                                              ) {
                                                                                 setImagePreview(
                                                                                    '',
                                                                                 );
                                                                              }

                                                                              if (
                                                                                 checked &&
                                                                                 imageArr.length ===
                                                                                    1
                                                                              ) {
                                                                                 setImagePreview(
                                                                                    imageArr[0],
                                                                                 );
                                                                              }

                                                                              return checked
                                                                                 ? field.onChange(
                                                                                      [
                                                                                         ...field.value,
                                                                                         item.secure_url,
                                                                                      ],
                                                                                   )
                                                                                 : field.onChange(
                                                                                      field.value?.filter(
                                                                                         (
                                                                                            value,
                                                                                         ) =>
                                                                                            value !==
                                                                                            item.secure_url,
                                                                                      ),
                                                                                   );
                                                                           }}
                                                                        />
                                                                     </FormControl>
                                                                     <div className="p-3 bg-[#1f2e44] rounded-md">
                                                                        <div className="relative h-[300px]">
                                                                           <Image
                                                                              src={
                                                                                 item.secure_url
                                                                              }
                                                                              alt="project"
                                                                              layout="fill"
                                                                              objectFit="cover"
                                                                           />
                                                                        </div>
                                                                     </div>
                                                                  </FormItem>
                                                               );
                                                            }}
                                                         />
                                                      ))}
                                                      <FormMessage className="col-span-2" />
                                                   </FormItem>
                                                )}
                                             />
                                          </div>
                                       </ScrollArea>
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

                                    <div className="col-span-1">
                                       <AppInput
                                          name="quantity"
                                          // placeholder="
                                          form={form as any}
                                          label="Quantity"
                                          type="number"
                                          value={quantity}
                                          setValue={setQuantity}
                                       />
                                    </div>
                                 </div>

                                 <div className="w-[100%] flex justify-end">
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
                        <div className="flex flex-col items-center w-full px-5">
                           <h2 className="text-xl font-bold">
                              Product card preview
                           </h2>

                           <div className="w-[240px] h-[240px] mt-5 rounded-xl bg-[#121f31]">
                              <div className="flex justify-center items-center h-[100%]">
                                 <img
                                    src={
                                       imagePreview ||
                                       'https://themesdesign.in/tailwick/html-dark/assets/images/img-03.png'
                                    }
                                    className="w-[200px] h-[200px] object-cover"
                                    alt="sample image"
                                 />
                              </div>
                           </div>

                           <h2 className="self-start mt-5 text-lg font-semibold">
                              ${price || 200.99}
                           </h2>

                           <h2 className="self-start mt-5 text-lg font-bold">
                              {name || 'Product name'}
                           </h2>

                           <p className="self-start mt-1 text-sm font-medium text-slate-300">
                              Woman's Fashion
                           </p>

                           <p className="self-start mt-5 text-sm dark:text-slate-400">
                              {description ||
                                 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis odio voluptatibus,tenetur totam obcaecati minima tempora nul porro! Fuga, id'}
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
