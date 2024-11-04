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

export type Payment = {
   id: string;
   code: string;
   name: string;
   category: string;
   amount: number;
   stock: number;
   status: 'pending' | 'processing' | 'success' | 'failed';
   //    email: string;
};

export const columns: ColumnDef<Payment>[] = [
   {
      id: 'select',
      header: ({ table }) => (
         <Checkbox
            checked={
               table.getIsAllPageRowsSelected() ||
               (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
               table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
         />
      ),
      cell: ({ row }) => (
         <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
         />
      ),
      enableSorting: false,
      enableHiding: false,
   },
   {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
         <div className="capitalize">{row.getValue('status')}</div>
      ),
   },
   {
      accessorKey: 'email',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Email
               <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
         );
      },
      cell: ({ row }) => (
         <div className="lowercase">{row.getValue('email')}</div>
      ),
   },
   {
      accessorKey: 'amount',
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
         const amount = parseFloat(row.getValue('amount'));

         // Format the amount as a dollar amount
         const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
         }).format(amount);

         return <div className="text-right font-medium">{formatted}</div>;
      },
   },
   {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
         const payment = row.original;

         return (
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                     <span className="sr-only">Open menu</span>
                     <DotsHorizontalIcon className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                     onClick={() => navigator.clipboard.writeText(payment.id)}
                  >
                     Copy payment ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View customer</DropdownMenuItem>
                  <DropdownMenuItem>View payment details</DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         );
      },
   },
];

export type Product = {
   id: string;
   product_code: string;
   product_name: string;
   category_name: string;
   product_price: number;
   product_stocks: number;
   product_status: 'Published';
};

export const productColumns: ColumnDef<Product>[] = [
   {
      accessorKey: 'product_code',
      header: 'Product Code',
      cell: ({ row }) => (
         <div className="capitalize dark:text-blue-600 font-semibold">
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
      cell: ({ row }) => (
         <div className="capitalize">{row.getValue('category_name')}</div>
      ),
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

         return <div className="text-left font-medium">{formatted}</div>;
      },
   },
   {
      accessorKey: 'product_stocks',
      header: 'Stock',
      cell: ({ row }) => {
         const stock = parseFloat(row.getValue('product_stocks'));

         return <div className="text-left font-medium">{stock}</div>;
      },
   },
   {
      accessorKey: 'product_status',
      header: 'Status',
      cell: ({ row }) => (
         <div className="capitalize">{row.getValue('product_status')}</div>
      ),
   },
   {
      id: 'actions',
      enableHiding: false,
      header: () => <div className="text-left">Actions</div>,
      cell: ({ row }) => {
         const product = row.original;

         return (
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                     <span className="sr-only">Open menu</span>
                     <DotsHorizontalIcon className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                     onClick={() => navigator.clipboard.writeText(product.id)}
                  >
                     Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Delete</DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         );
      },
   },
];
