/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table';

import { Input } from '~/components/ui/input';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '~/components/ui/table';
import { productColumns, Product } from './columns';
import { useEffect, useState } from 'react';
import * as productServices from '~/services/products.service';
import { ApiError } from '~/common/errors/Api.error';
import { IProductResponse } from '~/types/product.type';
import { toast } from '~/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';

const data: Product[] = [
   {
      id: '1',
      product_code: '#LVCOM-715920526',
      product_name: 'Sunflower Jumpsuit',
      category_name: 'Maxi',
      product_price: 100,
      product_stocks: 270,
      product_status: 'Published',
   },
];

export const ProductDataTable = () => {
   const router = useRouter();
   const [products, setProducts] = useState<IProductResponse[]>([]);

   const [pageIndex, setPageIndex] = useState(0);
   const [pageSize] = useState(5);

   console.log('products', products);

   const table = useReactTable({
      data: products,
      columns: productColumns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
         pagination: {
            pageSize,
            pageIndex,
         },
      },
   });

   useEffect(() => {
      const getAllProducts = async () => {
         const result = (await productServices.getAllProducts()) as
            | IProductResponse[]
            | ApiError
            | null;

         if (result instanceof ApiError) {
            console.log(result.errorResponse);

            toast({
               variant: 'destructive',
               title: `Account ${result.errorResponse?.message}`,
               description: `There was a problem with your request. ${result.errorResponse?.code}`,
            });

            router.push('/auth/login');

            return;
         }

         if (result) {
            setProducts(result as IProductResponse[]);
         }
      };

      getAllProducts();
   }, []);

   return (
      <div className="w-full">
         <div className="flex items-center py-4">
            <Input
               placeholder="Filter by name..."
               value={
                  (table
                     .getColumn('product_name')
                     ?.getFilterValue() as string) ?? ''
               }
               onChange={(event) =>
                  table
                     .getColumn('product_name')
                     ?.setFilterValue(event.target.value)
               }
               className="max-w-sm"
            />
         </div>
         <div className="rounded-md">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead key={header.id}>
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                         header.column.columnDef.header,
                                         header.getContext(),
                                      )}
                              </TableHead>
                           );
                        })}
                     </TableRow>
                  ))}
               </TableHeader>

               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           data-state={row.getIsSelected() && 'selected'}
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                 {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                 )}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell
                           colSpan={productColumns.length}
                           className="h-24 text-center"
                        >
                           No results.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
         <div className="flex items-center justify-end py-4 space-x-2">
            <Button
               variant="outline"
               size="sm"
               onClick={() => {
                  if (table.getCanPreviousPage()) {
                     setPageIndex(pageIndex - 1);
                  }
               }}
               disabled={!table.getCanPreviousPage()}
            >
               Previous
            </Button>
            <Button
               variant="outline"
               size="sm"
               onClick={() => {
                  if (table.getCanNextPage()) {
                     setPageIndex(pageIndex + 1);
                  }
               }}
               disabled={!table.getCanNextPage()}
            >
               Next
            </Button>
         </div>
      </div>
   );
};
