import { ApiError } from 'next/dist/server/api-utils';
import { IDashboardResponse } from '~/types/admin.type';
import { get } from '~/utils/http';

export const getDashboard = async (): Promise<
   IDashboardResponse | ApiError | null
> => {
   const result = await get('admin/dashboard');

   if (result instanceof ApiError) {
      return result as ApiError;
   }

   if ('data' in result) {
      return result.data as IDashboardResponse;
   }

   return null;
};
