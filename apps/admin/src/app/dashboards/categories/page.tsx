/* eslint-disable react/no-unescaped-entities */
'use client';

import CategoryItem from '~/components/categoryItem';
import { toast } from '~/hooks/use-toast';
import CreateCategoryModel from '~/components/create-category-model';
import { IGetAllCategoriesResponse } from '~/types/category.type';
import * as categoryService from '~/services/categories.service';
import { ApiError } from '~/common/errors/Api.error';
import { useEffect, useState } from 'react';
import { IoReloadCircleSharp } from 'react-icons/io5';
import Loading from '~/components/loading';

export default function DashboardCategories() {
   const [parentCategories, setParentCategories] = useState<
      IGetAllCategoriesResponse[]
   >([]);

   const [loading, setLoading] = useState(false);

   const [categories, setCategories] = useState<IGetAllCategoriesResponse[]>(
      [],
   );

   const getAllCategories = async () => {
      setLoading(true);

      const result = (await categoryService.getAllCategories()) as
         | IGetAllCategoriesResponse[]
         | ApiError
         | null;

      if (result instanceof ApiError) {
         toast({
            variant: 'destructive',
            title: `${result.errorResponse?.message}`,
            description: `There was a problem with your request. ${result.errorResponse?.code}`,
         });

         setLoading(false);

         return;
      }

      setCategories(result as IGetAllCategoriesResponse[]);

      const categories = result?.filter(
         (cate) => cate.category_parentId === null,
      ) as IGetAllCategoriesResponse[];

      setParentCategories(categories as IGetAllCategoriesResponse[]);

      setTimeout(() => {
         setLoading(false);
      }, 500);
   };

   useEffect(() => {
      async function fetchData() {
         const result = (await categoryService.getAllCategories()) as
            | IGetAllCategoriesResponse[]
            | ApiError
            | null;

         if (result instanceof ApiError) {
            toast({
               variant: 'destructive',
               title: `${result.errorResponse?.message}`,
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
      <div className="mx-20 mt-32 rounded-xl bg-third">
         {loading && <Loading />}

         <div className="flex justify-end p-5">
            <CreateCategoryModel />
         </div>
         <div className="ml-5">
            <div
               className="inline-block px-2 py-1 rounded-md cursor-pointer bg-blue-700/40 hover:bg-blue-700"
               onClick={() => {
                  getAllCategories();
               }}
            >
               <span className="flex items-center justify-center">
                  <i className="flex items-center justify-center">
                     <IoReloadCircleSharp className="mr-3 text-2xl font-bold text-slate-50" />
                  </i>
                  <p className="font-medium text-slate-50">Reload</p>
               </span>
            </div>
         </div>
         <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10 p-5">
            {loading
               ? null
               : parentCategories.map((category, index) => (
                    <CategoryItem
                       key={index}
                       categories={categories}
                       parentCategory={category}
                       reloadFunction={getAllCategories}
                    />
                 ))}
            {/* {parentCategories.map((category, index) => (
               <CategoryItem
                  key={index}
                  categories={categories}
                  parentCategory={category}
               />
            ))} */}
         </div>
      </div>
   );
}
