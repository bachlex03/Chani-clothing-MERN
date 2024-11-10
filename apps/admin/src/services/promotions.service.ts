import { ApiError } from '~/common/errors/Api.error';
import { IGetAllPromotionsResponse } from '~/types/categories/get-all.type';
import {
   ICreatePromotionPayload,
   ICreatePromotionResponse,
   IUpdatePromotionPayload,
} from '~/types/promotion.type';
import { get, post, put, remove } from '~/utils/http';

export const getAllPromotions = async () => {
   const result = await get('promotions');

   if (result instanceof ApiError) {
      return result as ApiError;
   }

   return result.data as IGetAllPromotionsResponse[];
};

export const createPromotion = async (payload: ICreatePromotionPayload) => {
   const result = await post<ICreatePromotionPayload>('promotions', payload);
   if (result instanceof ApiError) {
      return result as ApiError;
   }

   return result.data as ICreatePromotionResponse;
};

export const deletePromotion = async (id: string) => {
   const result = await remove(`promotions/${id}`);

   console.log('result', result);

   if (result instanceof ApiError) {
      return result as ApiError;
   }

   return result.data;
};

export const updatePromotion = async (
   id: string = '',
   payload: IUpdatePromotionPayload,
) => {
   const result = await put(`promotions/${id}`, payload);

   console.log('result', result);

   if (result instanceof ApiError) {
      return result as ApiError;
   }

   return result.data;
};
