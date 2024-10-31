import { IBaseError } from '~/types/errors/base.error';

export class ApiError extends Error {
   constructor(
      public status: string,
      public code: number,
      public message: string,
      public errorResponse?: IBaseError,
   ) {
      super(message);
   }
}
