import { ApiError } from 'next/dist/server/api-utils';
import { get } from '~/utils/http';

export const getProfile = async (): Promise<boolean | ApiError | null> => {
   const result = await get('users/profile');

   if (result instanceof ApiError) {
      return result as ApiError;
   }

   return true;
};
