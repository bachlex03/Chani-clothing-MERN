import { ApiError } from '~/common/errors/Api.error';
import { IGetAllPromotionsResponse } from '~/types/categories/get-all.type';
import {
   ICreatePromotionPayload,
   ICreatePromotionResponse,
} from '~/types/promotion.type';
import { get, post } from '~/utils/http';

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
