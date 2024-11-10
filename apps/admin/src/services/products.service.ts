import { ApiError } from '~/common/errors/Api.error';
import { IProductResponse } from '~/types/product.type';
import { get, remove } from '~/utils/http';

export const getAllProducts = async (): Promise<
   IProductResponse[] | ApiError
> => {
   const result = await get('products');

   if (result instanceof ApiError) {
      return result as ApiError;
   }

   return result.data as IProductResponse[];
};

export const removeProductById = async (id: string) => {
   const response = await remove(`products/${id}`);

   if (response instanceof ApiError) {
      return response as ApiError;
   }

   return response.data;
};
