/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { Button } from '~/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import ProductDialog from '~/components/product-dialog';
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '~/components/ui/dialog';
import { useState } from 'react';
import { IProductResponse } from '~/types/product.type';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '~/hooks/use-toast';
import * as productServices from '~/services/products.service';
import { ApiError } from '~/common/errors/Api.error';
import { Form, FormField } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import Loading from '~/components/loading';

export type Product = {
   id: string;
   product_code: string;
   product_name: string;
   category_name: string;
   product_price: number;
   product_stocks: number;
   product_status: 'Published';
};

enum Dialogs {
   dialog1 = 'dialog1',
   dialog2 = 'dialog2',
}

const deleteProductSchema = z.object({
   id: z.string().min(1),
});

export const productColumns: ColumnDef<IProductResponse>[] = [
   {
      accessorKey: 'product_code',
      header: 'Product Code',
      cell: ({ row }) => (
         <div className="font-semibold capitalize dark:text-blue-600">
            {row.getValue('product_code')}
         </div>
      ),
   },
   {
      accessorKey: 'product_name',
      header: 'Product Name',
      cell: ({ row }) => (
         <div className="capitalize">{row.getValue('product_name')}</div>
      ),
   },
   {
      accessorKey: 'category_name',
      header: 'Category',
      cell: ({ row }) => {
         const product = row.original;
         return (
            <div className="capitalize">
               {product.product_category.category_name}
            </div>
         );
      },
   },
   {
      accessorKey: 'product_price',
      header: 'Price',
      cell: ({ row }) => {
         const amount = parseFloat(row.getValue('product_price'));

         // Format the amount as a dollar amount
         const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
         }).format(amount);

         return <div className="font-medium text-left">{formatted}</div>;
      },
   },
   {
      accessorKey: 'product_stocks',
      header: 'Stock',
      cell: ({ row }) => {
         return (
            <div className="font-medium text-left">
               {row.original.product_stocks}
            </div>
         );
      },
   },
   {
      accessorKey: 'product_status',
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => (
         <div className="text-center capitalize">
            <span
               className={`text-xs px-2 py-1 rounded-lg text-center ${
                  row.getValue('product_status') === 'Published'
                     ? 'bg-green-500/50'
                     : 'bg-slate-500/50'
               }`}
            >
               {row.getValue('product_status')}
            </span>
         </div>
      ),
   },
   {
      id: 'actions',
      enableHiding: false,
      header: () => <div className="text-left">Actions</div>,
      cell: ({ row }) => {
         const product = row.original;
         const [dialog, setDialog] = useState<Dialogs | null>(null);
         const [open, setOpen] = useState(false);
         const [loading, setLoading] = useState(false);

         const deleteForm = useForm<z.infer<typeof deleteProductSchema>>({
            resolver: zodResolver(deleteProductSchema),
            defaultValues: {
               id: '',
            },
         });

         const onDelete = async (data: z.infer<typeof deleteProductSchema>) => {
            setLoading(true);

            toast({
               title: 'Delete Payload',
               className: 'text-white dark:text-white',
               description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                     <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                     </code>
                  </pre>
               ),
            });

            const result = await productServices.removeProductById(data.id);

            if (result instanceof ApiError) {
               setLoading(false);
               return toast({
                  title: 'Delete Error',
                  description: result.message,
               });
            }

            setOpen(false);

            setTimeout(() => {
               setOpen(false);

               setLoading(false);
            }, 500);

            toast({
               title: 'Delete Success',
               description: 'Promotion deleted successfully',
            });
         };

         return (
            <Dialog
               open={open}
               onOpenChange={(isOpen) => {
                  if (!isOpen) {
                     setOpen(false);
                  }
               }}
            >
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" className="w-8 h-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <DotsHorizontalIcon className="w-4 h-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
                     {/* <DropdownMenuItem
                        onClick={() =>
                           navigator.clipboard.writeText(product.id)
                        }
                     ></DropdownMenuItem> */}
                     <DialogTrigger
                        asChild
                        onClick={() => {
                           setDialog(Dialogs.dialog1);
                           setOpen(true);
                        }}
                     >
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                     </DialogTrigger>
                     <DropdownMenuSeparator />
                     <DialogTrigger
                        asChild
                        onClick={() => {
                           setDialog(Dialogs.dialog2);
                           setOpen(true);

                           deleteForm.setValue('id', row.original._id);
                        }}
                     >
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                     </DialogTrigger>
                  </DropdownMenuContent>
               </DropdownMenu>

               {dialog === Dialogs.dialog1 ? (
                  <ProductDialog
                     id={row.original._id}
                     name={row.original.product_name}
                     description={row.original.product_description}
                     price={row.original.product_price}
                     status={row.original.product_status}
                     brand={row.original.product_brand}
                     category={row.original.product_category.category_name}
                     categoryId={row.original.product_category._id}
                     type={row.original.product_type}
                     gender={row.original.product_gender}
                     imageUrl={row.original.product_imgs[0].secure_url}
                  />
               ) : null}

               {dialog === Dialogs.dialog2 ? (
                  <div>
                     {loading && <Loading className="bg-five/50" />}

                     <DialogContent className="rounded-lg">
                        <DialogHeader className="flex flex-col items-center mt-5">
                           <DialogTitle className="text-sm">
                              Are you sure want to delete this Item ?
                              <p className="mt-5 text-xl text-center">
                                 {product.product_name}
                              </p>
                           </DialogTitle>
                        </DialogHeader>
                        <div className="flex justify-center mt-5">
                           <Form {...deleteForm}>
                              <form
                                 onSubmit={deleteForm.handleSubmit(onDelete)}
                              >
                                 <FormField
                                    name="id"
                                    control={deleteForm.control}
                                    render={({ field }) => (
                                       <Input {...field} type="hidden" />
                                    )}
                                 />
                                 <Button
                                    type="submit"
                                    className="mr-5 dark:bg-slate-300"
                                 >
                                    Yes
                                 </Button>
                                 <Button
                                    type="button"
                                    className="dark:bg-primary dark:text-slate-200 dark:hover:bg-slate-700"
                                    onClick={() => {
                                       setDialog(null);
                                       setOpen(false);
                                    }}
                                 >
                                    Cancel
                                 </Button>
                              </form>
                           </Form>
                        </div>
                        <DialogFooter></DialogFooter>
                     </DialogContent>
                  </div>
               ) : null}
            </Dialog>
         );
      },
   },
];
