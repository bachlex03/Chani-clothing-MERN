import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import * as userServices from '~/services/user.service';
import { ApiError } from '~/common/errors/Api.error';

export function useAuthValidation(redirectPath = '/auth/login') {
   const [loading, setLoading] = useState(true);
   const router = useRouter();

   useEffect(() => {
      async function validateAccessToken() {
         const token = Cookies.get('access-token');

         if (!token) {
            router.push(redirectPath);
            setLoading(false);
            return;
         }

         const result = await userServices.getProfile();

         if (result instanceof ApiError) {
            router.push(redirectPath);
            setLoading(false);
            return;
         }

         setLoading(false);
      }

      validateAccessToken();
   }, [router, redirectPath]);

   return { loading };
}
