/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import * as userServices from '~/services/user.service';
import { ApiError } from '~/common/errors/Api.error';
import Loading from '~/components/loading';

export default function Home() {
   const router = useRouter();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (!Cookies.get('access-token')) {
         router.push('/auth/login');

         setLoading(false);

         return;
      }

      const result = userServices.getProfile();

      if (result instanceof ApiError) {
         router.push('/auth/login');

         setLoading(false);

         return;
      }

      setLoading(false);

      router.push('/dashboards');
   }, []);

   return (
      <div className="w-screen h-screen bg-five">{loading && <Loading />}</div>
   );
}
