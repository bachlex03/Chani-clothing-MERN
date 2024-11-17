import { IApiResponse } from '~/types/api-response.type';
import { serializeUrl } from '../serializer';
import { IHeaderOptions } from './header-options.interface';
import { ApiError } from '~/common/errors/Api.error';
import Cookies from 'js-cookie';
import { environments } from '~/environments';

export const get = async (
   url: string,
   params: Record<string, string> = {},
   options: IHeaderOptions = {},
): Promise<IApiResponse | ApiError> => {
   const serializedUrl = serializeUrl(url, params);

   try {
      const response = await fetch(environments.API_URL + serializedUrl, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            ...(Cookies.get('access-token')
               ? {
                    Authorization: `Bearer ${Cookies.get('access-token')}`,
                 }
               : {}),
            ...options,
         },
      });

      if (!response.ok) {
         const errorData = await response.json();
         return new ApiError(
            errorData.status,
            errorData.code,
            errorData.message,
            errorData,
         );
      }

      return (await response.json()) as IApiResponse;
   } catch {
      return new ApiError('500', 500, 'Internal server error');
   }
};

export const post = async <IRequest>(
   url: string,
   body: string | FormData | IRequest,
   options: IHeaderOptions = {},
): Promise<IApiResponse | ApiError> => {
   const serializedUrl = serializeUrl(url);

   try {
      const response = await fetch(environments.API_URL + serializedUrl, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            ...(Cookies.get('access-token')
               ? {
                    Authorization: `Bearer ${Cookies.get('access-token')}`,
                 }
               : {}),
            ...options,
         },
         body: JSON.stringify(body),
      });

      if (!response.ok) {
         const errorData = await response.json();
         return new ApiError(
            errorData.status,
            errorData.code,
            errorData.message,
            errorData,
         );
      }

      return (await response.json()) as IApiResponse;
   } catch {
      return new ApiError('500', 500, 'Internal server error');
   }
};

export const put = async <IRequest>(
   url: string,
   body: string | FormData | IRequest,
   options: IHeaderOptions = {},
): Promise<IApiResponse | ApiError> => {
   const serializedUrl = serializeUrl(url);

   try {
      const response = await fetch(baseUrl + serializedUrl, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            ...(Cookies.get('access-token')
               ? {
                    Authorization: `Bearer ${Cookies.get('access-token')}`,
                 }
               : {}),
            ...options,
         },
         body: JSON.stringify(body),
      });

      if (!response.ok) {
         const errorData = await response.json();
         return new ApiError(
            errorData.status,
            errorData.code,
            errorData.message,
            errorData,
         );
      }

      return (await response.json()) as IApiResponse;
   } catch {
      return new ApiError('500', 500, 'Internal server error');
   }
};

export const remove = async (url: string, options: IHeaderOptions = {}) => {
   const serializedUrl = serializeUrl(url);

   try {
      const response = await fetch(baseUrl + serializedUrl, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            ...(Cookies.get('access-token')
               ? {
                    Authorization: `Bearer ${Cookies.get('access-token')}`,
                 }
               : {}),
            ...options,
         },
      });

      if (!response.ok) {
         const errorData = await response.json();
         return new ApiError(
            errorData.status,
            errorData.code,
            errorData.message,
            errorData,
         );
      }

      return (await response.json()) as IApiResponse;
   } catch {
      return new ApiError('500', 500, 'Internal server error');
   }
};
