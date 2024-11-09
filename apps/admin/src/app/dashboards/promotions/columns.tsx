import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';

import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
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
import {
   ICreatePromotionPayload,
   IUpdatePromotionPayload,
} from '~/types/promotion.type';

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

export const categoryColumn: ColumnDef<Promotion>[] = [
   {
      accessorKey: '_id',
      header: 'ID',
      cell: ({ row }) => (
         <div className="capitalize dark:text-blue-600 font-semibold">
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
         <div className="capitalize text-center">
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
      cell: ({ row }) => (
         <div className="capitalize text-center">
            <span
               className={`text-xs px-2 py-1 rounded-lg text-center ${
                  row.getValue('is_active')
                     ? 'bg-green-500/50'
                     : 'bg-red-500/50'
               }`}
            >
               {row.getValue('is_active') ? 'Active' : 'Inactive'}
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
         const [dialog, setDialog] = useState(Dialogs.dialog1);

         const data: IUpdatePromotionPayload = {
            id: row.getValue('_id'),
            name: row.getValue('promotion_name'),
            value: row.getValue('promotion_value'),
            startDate: row.getValue('promotion_start_date'),
            endDate: row.getValue('promotion_end_date'),
            // categoryId: row.getValue('category_id'),
         };

         return (
            <Dialog>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <DotsHorizontalIcon className="h-4 w-4" />
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
                        }}
                     >
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                     </DialogTrigger>
                     <DropdownMenuSeparator />
                     <DialogTrigger
                        asChild
                        onClick={() => {
                           setDialog(Dialogs.dialog2);
                        }}
                     >
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                     </DialogTrigger>
                  </DropdownMenuContent>
               </DropdownMenu>

               {dialog === Dialogs.dialog1 ? (
                  <ProductDialog />
               ) : (
                  <DialogContent className="rounded-lg">
                     <DialogHeader className="flex flex-col mt-5 items-center">
                        <DialogTitle className="text-sm">
                           Are you sure want to delete this Item ?
                           <p className="text-center mt-5 text-xl">
                              {row.getValue('promotion_name')}
                           </p>
                        </DialogTitle>
                     </DialogHeader>
                     <div className="flex justify-center mt-5">
                        <Button className="mr-5 dark:bg-slate-300">Yes</Button>
                        <Button className="dark:bg-primary dark:text-slate-200 dark:hover:bg-slate-700">
                           Cancel
                        </Button>
                     </div>
                     <DialogFooter></DialogFooter>
                  </DialogContent>
               )}
            </Dialog>
         );
      },
   },
];
