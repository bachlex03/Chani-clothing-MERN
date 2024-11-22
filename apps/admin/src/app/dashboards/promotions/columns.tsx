/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

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
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '~/components/ui/dialog';
import { useState } from 'react';
import { Form, FormField } from '~/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '~/components/ui/input';
import { toast } from '~/hooks/use-toast';
import * as promotionServices from '~/services/promotions.service';
import Loading from '~/components/loading';
import { ApiError } from '~/common/errors/Api.error';
import PromotionDialog from '~/components/promotion.dialog';

export type Promotion = {
   _id: string;
   promotion_name: string;
   promotion_value: number;
   promotion_start_date: string;
   promotion_end_date: string;
   is_active: boolean;
};

enum Dialogs {
   dialog1 = 'dialog1',
   dialog2 = 'dialog2',
}

const deletePromotionSchema = z.object({
   id: z.string().min(1),
});

export const promotionColumns = (
   handleReload: () => void,
): ColumnDef<Promotion>[] => [
   {
      accessorKey: '_id',
      header: 'ID',
      cell: ({ row }) => (
         <div className="font-semibold capitalize dark:text-blue-600">
            {row.getValue('_id')}
         </div>
      ),
   },
   {
      accessorKey: 'promotion_name',
      header: 'Promotion Name',
      cell: ({ row }) => (
         <div className="capitalize">{row.getValue('promotion_name')}</div>
      ),
   },
   {
      accessorKey: 'promotion_value',
      header: () => <div className="text-center">Discount rate</div>,
      cell: ({ row }) => (
         <div className="text-center capitalize">
            {row.getValue('promotion_value')}
         </div>
      ),
   },
   {
      accessorKey: 'promotion_start_date',
      header: 'Start Date',
      cell: ({ row }) => {
         const dateStr = row.getValue('promotion_start_date');
         const date = new Date(dateStr as any);
         const formattedDate = date.toLocaleDateString('en-GB');

         return <div className="">{formattedDate.toString()}</div>;
      },
   },
   {
      accessorKey: 'promotion_end_date',
      header: 'End Date',
      cell: ({ row }) => {
         const dateStr = row.getValue('promotion_end_date');
         const date = new Date(dateStr as any);
         const formattedDate = date.toLocaleDateString('en-GB');

         return <div className="">{formattedDate.toString()}</div>;
      },
   },
   {
      accessorKey: 'is_active',
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => {
         const isExpired =
            new Date(row.getValue('promotion_end_date')) < new Date();

         return (
            <div className="text-center capitalize">
               <span
                  className={`text-xs px-2 py-1 rounded-lg text-center ${
                     !isExpired ? 'bg-green-500/50' : 'bg-red-500/50'
                  }`}
               >
                  {!isExpired ? 'Active' : 'Expired'}
               </span>
            </div>
         );
      },
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

         const deleteForm = useForm<z.infer<typeof deletePromotionSchema>>({
            resolver: zodResolver(deletePromotionSchema),
            defaultValues: {
               id: '',
            },
         });

         const onDelete = async (
            data: z.infer<typeof deletePromotionSchema>,
         ) => {
            setLoading(true);

            // toast({
            //    title: 'Delete Payload',
            //    className: 'text-white dark:text-white',
            //    description: (
            //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            //          <code className="text-white">
            //             {JSON.stringify(data, null, 2)}
            //          </code>
            //       </pre>
            //    ),
            // });

            const result = await promotionServices.deletePromotion(data.id);

            if (result instanceof ApiError) {
               setLoading(false);
               return toast({
                  title: 'Delete Error',
                  description: result.message,
                  variant: 'destructive',
               });
            }

            setOpen(false);
            setLoading(false);

            toast({
               title: 'Deleted successfully',
               description: 'Promotion deleted successfully.',
               className: 'dark:bg-green-500/60 text-white dark:text-white',
            });

            handleReload();
         };

         return (
            <div>
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
                           }}
                        >
                           <DropdownMenuItem
                              onClick={() => {
                                 setDialog(Dialogs.dialog2);
                                 setOpen(true);
                                 deleteForm.setValue('id', row.getValue('_id'));
                              }}
                           >
                              Delete
                           </DropdownMenuItem>
                        </DialogTrigger>
                     </DropdownMenuContent>
                  </DropdownMenu>
                  {dialog === Dialogs.dialog1 ? (
                     <PromotionDialog
                        id={row.getValue('_id')}
                        name={row.getValue('promotion_name')}
                        value={row.getValue('promotion_value')}
                        startDate={row.getValue('promotion_start_date')}
                        endDate={row.getValue('promotion_end_date')}
                        // categoryId={row.getValue('category_id')}
                        reloadFunction={handleReload}
                     />
                  ) : null}
                  {dialog === Dialogs.dialog2 ? (
                     <DialogContent className="rounded-lg">
                        {loading && <Loading className="bg-five/50" />}

                        <DialogHeader className="flex flex-col items-center mt-5">
                           <DialogTitle className="text-sm">
                              Are you sure want to delete this Item ?
                              <p className="mt-5 text-xl text-center">
                                 {row.getValue('promotion_name')}
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
                  ) : null}
               </Dialog>
            </div>
         );
      },
   },
];
