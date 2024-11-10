/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   useReactTable,
} from '@tanstack/react-table';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '~/components/ui/table';
import { promotionColumns } from './columns';
import { useEffect, useState } from 'react';
import * as promotionServices from '~/services/promotions.service';
import { IGetAllPromotionsResponse } from '~/types/categories/get-all.type';
import { ApiError } from '~/common/errors/Api.error';
import { toast } from '~/hooks/use-toast';
import { useRouter } from 'next/navigation';

export const PromotionDataTable = () => {
   const router = useRouter();

   const [promotions, setPromotions] = useState<IGetAllPromotionsResponse[]>(
      [],
   );

   const [pageIndex, setPageIndex] = useState(0);
   const [pageSize] = useState(6);

   const table = useReactTable({
      data: promotions,
      columns: promotionColumns,
      // onSortingChange: setSorting,
      // onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      // getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      // onColumnVisibilityChange: setColumnVisibility,
      // onRowSelectionChange: setRowSelection,
      state: {
         pagination: {
            pageSize,
            pageIndex,
         },
      },
   });

   useEffect(() => {
      async function getAllPromotions() {
         const result = (await promotionServices.getAllPromotions()) as
            | IGetAllPromotionsResponse[]
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

         if (result && 'data' in result) {
            setPromotions(result.data as IGetAllPromotionsResponse[]);
         }
      }

      getAllPromotions();
   }, []);

   return (
      <div className="w-full">
         <div className="flex items-center py-4">
            <Input
               placeholder="Filter by name..."
               value={
                  (table
                     .getColumn('promotion_name')
                     ?.getFilterValue() as string) ?? ''
               }
               onChange={(event) =>
                  table
                     .getColumn('promotion_name')
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
                           colSpan={promotionColumns.length}
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
