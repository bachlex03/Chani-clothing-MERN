import { ApiError } from '~/common/errors/Api.error';
import { ILoginPayload, ILoginResponse } from '~/types/auth/login.type';
import { post } from '~/utils/http';

export const login = async (
   payload: ILoginPayload,
): Promise<ILoginResponse | ApiError> => {
   const result = await post<ILoginPayload>('auth/login', payload);

   if (result instanceof ApiError) {
      return result as ApiError;
   }

   return result.data as ILoginResponse;
};
