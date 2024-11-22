import { ApiError } from 'next/dist/server/api-utils';
import { IGetAllInvoicesResponse } from '~/types/invoice.type';
import { get } from '~/utils/http';

export const getAllInvoices = async (): Promise<
   IGetAllInvoicesResponse[] | ApiError | null
> => {
   const result = await get('invoices');

   if (result instanceof ApiError) {
      return result as ApiError;
   }

   if ('data' in result) {
      return result.data as IGetAllInvoicesResponse[];
   }

   return null;
};
