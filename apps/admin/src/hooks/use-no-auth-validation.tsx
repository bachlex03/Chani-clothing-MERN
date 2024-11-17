import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import * as userServices from '~/services/user.service';
import { ApiError } from '~/common/errors/Api.error';

export function useNoAuthValidation(redirectPath = '/dashboards') {
   const router = useRouter();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const accessToken = Cookies.get('access-token');
      if (!accessToken) {
         setLoading(false); // No token, allow access to login/register pages
         return;
      }

      // Check if the token is valid
      const validateToken = async () => {
         const result = await userServices.getProfile();
         if (!(result instanceof ApiError)) {
            router.push(redirectPath); // Valid token, redirect to dashboard
         }
         setLoading(false); // Token invalid, allow access
      };

      validateToken();
   }, [router, redirectPath]);

   return { loading };
}
