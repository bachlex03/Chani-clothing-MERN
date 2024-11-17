/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApiError } from '~/common/errors/Api.error';
import { UploadPayload } from '~/types/upload.type';
import { post } from '~/utils/http';

export const uploadMultipleImage = async (payload: UploadPayload) => {
   // Convert payload into FormData
   const formData = new FormData();
   payload.images.forEach((image) => formData.append('images', image));

   // Use post function with FormData
   const result = await post('upload/multiple', formData);

   if (result instanceof ApiError) {
      return result;
   }

   return result.data;
};
