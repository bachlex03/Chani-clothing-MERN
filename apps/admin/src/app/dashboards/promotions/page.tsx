'use client';

import Header from '~/components/Header';
import { PromotionDataTable } from './data-table';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import { IGetAllCategoriesResponse } from '~/types/categories/get-all.type';
import { Suspense, useEffect, useState } from 'react';
import { ApiError } from '~/common/errors/Api.error';
import { toast } from '~/hooks/use-toast';
import * as categoryServices from '~/services/categories/categories.service';

import Loading from '~/components/loading';
import CreatePromotionDialog from '~/components/create-promotion-dialog';

export default function DashboardPromotions() {
   const [categories, setCategories] = useState<IGetAllCategoriesResponse[]>(
      [],
   );

   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function getAllCategories() {
         const result = (await categoryServices.getAllCategories()) as
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

         const categories = result?.filter(
            (cate) => cate.category_parentId !== null,
         ) as IGetAllCategoriesResponse[];

         setCategories(categories as IGetAllCategoriesResponse[]);

         setTimeout(() => {
            setLoading(false);
         }, 500);
      }

      getAllCategories();
   }, []);

   return (
      <div className="w-full">
         {loading && <Loading />}

         <Header />

         <div className=" bg-primary h-[85vh] mx-8 mt-20 px-5 rounded-lg">
            <div className="flex justify-end pt-5">
               <CreatePromotionDialog categories={categories} />
            </div>

            <div className="mx-auto pt-5">
               <Suspense fallback={<Loading></Loading>}>
                  <PromotionDataTable />
               </Suspense>
            </div>
         </div>
      </div>
   );
}
