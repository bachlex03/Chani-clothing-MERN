import { ApiError } from '~/common/errors/Api.error';
import { IImageResponse } from '~/types/cloudinary.type';
import { get } from '~/utils/http';

export const getAllImages = async (): Promise<IImageResponse[] | ApiError> => {
   const result = await get('upload/images');

   if (result instanceof ApiError) {
      return result as ApiError;
   }

   return result.data as IImageResponse[];
};
