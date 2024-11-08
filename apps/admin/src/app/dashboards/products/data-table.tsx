/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
   ColumnFiltersState,
   SortingState,
   VisibilityState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table';

import { Button } from '~/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Input } from '~/components/ui/input';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '~/components/ui/table';
import { productColumns, columns, Product, Payment } from './columns';
import { useState } from 'react';
import { ILoginPayload } from '~/types/auth/login.type';

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
   const table = useReactTable({
      data,
      columns: productColumns,
      // onSortingChange: setSorting,
      // onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      // onColumnVisibilityChange: setColumnVisibility,
      // onRowSelectionChange: setRowSelection,
      // state: {
      //    sorting,
      //    columnFilters,
      //    columnVisibility,
      //    rowSelection,
      // },
   });

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
                           colSpan={columns.length}
                           className="h-24 text-center"
                        >
                           No results.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
      </div>
   );
};
