import { ApiError } from 'next/dist/server/api-utils';
import {
   ICategoryResponse,
   ICreateCategoryPayload,
   IGetAllCategoriesResponse,
   IUpdateCategoryPayload,
} from '~/types/category.type';
import { get, post, put, remove } from '~/utils/http';

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

export const createCategory = async (payload: ICreateCategoryPayload) => {
   const result = await post<ICreateCategoryPayload>('categories', payload);
   if (result instanceof ApiError) {
      return result;
   }

   if ('data' in result) {
      return result.data as ICategoryResponse[];
   }

   return null;
};

export const updateCategory = async (
   id: string,
   payload: IUpdateCategoryPayload,
) => {
   const result = await put(`categories/${id}`, payload);

   console.log('result', result);

   if (result instanceof ApiError) {
      return result as ApiError;
   }

   if ('data' in result) {
      return result.data;
   }

   return null;
};

export const deleteCategory = async (id: string) => {
   const result = await remove(`categories/${id}`);

   if (result instanceof ApiError) {
      return result as ApiError;
   }

   if ('data' in result) {
      return result.data;
   }

   return null;
};
