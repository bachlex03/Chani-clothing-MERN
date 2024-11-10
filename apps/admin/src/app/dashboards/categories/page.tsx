/* eslint-disable react/no-unescaped-entities */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CategoryItem from '~/components/categoryItem';
import Header from '~/components/Header';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '~/components/ui/dialog';
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '~/components/ui/popover';
import { toast } from '~/hooks/use-toast';
import { cn } from '~/lib/utils';
import { FaCaretRight, FaCheck } from 'react-icons/fa';
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from '~/components/ui/command';
import CreateCategoryModel from '~/components/create-category-model';
import { IGetAllCategoriesResponse } from '~/types/categories/get-all.type';
import * as categoryService from '~/services/categories/categories.service';
import { ApiError } from '~/common/errors/Api.error';
import { useEffect, useState } from 'react';

export default function DashboardCategories() {
   const [parentCategories, setParentCategories] = useState<
      IGetAllCategoriesResponse[]
   >([]);

   const [categories, setCategories] = useState<IGetAllCategoriesResponse[]>(
      [],
   );

   useEffect(() => {
      async function fetchData() {
         const result = (await categoryService.getAllCategories()) as
            | IGetAllCategoriesResponse[]
            | ApiError
            | null;

         if (result instanceof ApiError) {
            console.log(result.errorResponse);

            toast({
               variant: 'destructive',
               title: `Account ${result.errorResponse?.message}`,
               description: `There was a problem with your request. ${result.errorResponse?.code}`,
            });

            return;
         }

         setCategories(result as IGetAllCategoriesResponse[]);

         const categories = result?.filter(
            (cate) => cate.category_parentId === null,
         ) as IGetAllCategoriesResponse[];

         setParentCategories(categories as IGetAllCategoriesResponse[]);
      }

      fetchData();
   }, []);

   return (
      <div className="mt-32 mx-20 rounded-xl bg-third">
         <div className="flex justify-end p-5">
            <CreateCategoryModel />
         </div>
         <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10 p-5">
            {parentCategories.map((category, index) => (
               <CategoryItem
                  key={index}
                  categories={categories}
                  parentCategory={category}
               />
            ))}
         </div>
      </div>
   );
}
