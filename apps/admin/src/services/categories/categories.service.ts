import { ApiError } from 'next/dist/server/api-utils';
import { IGetAllCategoriesResponse } from '~/types/categories/get-all.type';
import { get } from '~/utils/http';

export const getAllCategories = async (): Promise<
   IGetAllCategoriesResponse[] | ApiError | null
> => {
   const result = await get('categories');

   if (result instanceof ApiError) {
      return result as ApiError;
   }

   if ('data' in result) {
      return result.data as IGetAllCategoriesResponse[];
   }

   return null;
};
