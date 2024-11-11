import { ApiError } from '~/common/errors/Api.error';
import { ICreateProductPayload, IProductResponse } from '~/types/product.type';
import { get, post, remove } from '~/utils/http';

export const getAllProducts = async (): Promise<
   IProductResponse[] | ApiError
> => {
   const result = await get('products');

   if (result instanceof ApiError) {
      return result;
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

export const createProduct = async (payload: ICreateProductPayload) => {
   const result = await post<ICreateProductPayload>('products', payload);
   if (result instanceof ApiError) {
      return result;
   }

   return result.data as IProductResponse[];
};

export const deletePromotion = async (id: string) => {
   const result = await remove(`promotions/${id}`);

   if (result instanceof ApiError) {
      return result as ApiError;
   }

   return result.data;
};
