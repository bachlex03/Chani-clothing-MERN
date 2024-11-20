/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AppBarChart from '~/components/app-bar-chart';
import AppCard, { AppCardContent, AppCardProps } from '~/components/app-card';
import { AppLineChart } from '~/components/app-line-chart';
import DonutChart from '~/components/donut-chart';
import Cookies from 'js-cookie';
import * as userServices from '~/services/user.service';
import { ApiError } from '~/common/errors/Api.error';
import Loading from '~/components/loading';

const CardData: AppCardProps[] = [
   {
      label: 'Total Revenue',
      amount: '$5,231.89',
      description: '+20.1% from last month',
      icon: 'applications',
   },
   {
      label: 'Users',
      amount: '+600',
      description: '+201 since last hour',
      icon: 'shortlisted',
   },
   {
      label: 'Sales',
      amount: '+500',
      description: '+19% from last month',
      icon: 'rejected',
   },
   {
      label: 'Product active',
      amount: '+10',
      description: 'Products are active',
      icon: 'on-hold',
   },
];

export default function DashboardLayout() {
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
   }, []);

   return (
      <div className="mx-5 mt-20">
         {loading && <Loading />}

         <AppCardContent className="border-none bg-primary">
            <h2 className="ml-5 text-2xl font-bold">Dashboard</h2>
            <div className="flex gap-5 mt-5">
               {CardData.map((card, index) => (
                  <AppCard
                     key={index}
                     label={card.label}
                     amount={card.amount}
                     description={card.description}
                     icon={card.icon}
                  />
               ))}
            </div>
            <section className="grid grid-cols-1 gap-5 mt-5 transition-all lg:grid-cols-3">
               <AppCardContent className="col-span-2 border-none shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]">
                  <AppBarChart />
               </AppCardContent>
               <AppCardContent className="border-none shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]">
                  <p className="mt-5 ml-5 text-2xl font-bold">User Agents</p>
                  <DonutChart />
               </AppCardContent>
            </section>

            <section>
               <AppCardContent className="border-none">
                  <AppLineChart />
               </AppCardContent>
            </section>
         </AppCardContent>
      </div>
   );
}
