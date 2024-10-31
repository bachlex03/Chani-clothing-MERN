'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Payment = {
   id: string;
   code: number;
   name: string;
   category: string;
   price: number;
   stock: number;
   status: 'pending' | 'processing' | 'success' | 'failed';
   action: string;
};

export const columns: ColumnDef<Payment>[] = [
   {
      accessorKey: 'code',
      header: '#Code',
   },
   {
      accessorKey: 'name',
      header: 'Name',
   },
   {
      accessorKey: 'category',
      header: 'Category',
   },
   {
      accessorKey: 'price',
      header: 'Price',
   },
   {
      accessorKey: 'stock',
      header: 'Stock',
   },
   {
      accessorKey: 'status',
      header: 'Status',
   },
   {
      accessorKey: 'action',
      header: 'Action',
   },
];
