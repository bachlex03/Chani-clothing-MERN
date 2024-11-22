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
import * as adminServices from '~/services/admin.service';
import { ApiError } from '~/common/errors/Api.error';
import Loading from '~/components/loading';
import { IDashboardResponse } from '~/types/admin.type';

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
   const [dashboard, setDashboard] = useState<IDashboardResponse>({
      total_revenues: 0,
      total_users: 0,
      total_sales: 0,
      total_product_actives: 0,
   });

   console.log(dashboard);

   const getDashboard = async () => {
      const result = await adminServices.getDashboard();

      console.log(result);

      if (result instanceof ApiError) {
         setLoading(false);

         return;
      }

      setDashboard(result as IDashboardResponse);

      setLoading(false);
   };

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

      getDashboard();

      setLoading(false);
   }, []);

   return (
      <div className="mx-5 mt-20">
         {loading && <Loading />}

         <AppCardContent className="border-none bg-primary">
            <h2 className="ml-5 text-2xl font-bold">Dashboard</h2>
            <div className="flex gap-5 mt-5">
               {/* {CardData.map((card, index) => (
                  <AppCard
                     key={index}
                     label={card.label}
                     amount={card.amount}
                     description={card.description}
                     icon={card.icon}
                     dasboard={dasboard}
                  />
               ))} */}
               <AppCard
                  label={CardData[0].label}
                  amount={dashboard.total_revenues.toString() + '+'}
                  description={CardData[0].description}
                  icon={CardData[0].icon}
               />

               <AppCard
                  label={CardData[1].label}
                  amount={dashboard.total_users.toString() + '+'}
                  description={CardData[1].description}
                  icon={CardData[1].icon}
               />

               <AppCard
                  label={CardData[2].label}
                  amount={dashboard.total_sales.toString() + '+'}
                  description={CardData[2].description}
                  icon={CardData[2].icon}
               />

               <AppCard
                  label={CardData[3].label}
                  amount={dashboard.total_product_actives.toString() + '+'}
                  description={CardData[3].description}
                  icon={CardData[3].icon}
               />
            </div>
            <section className="grid grid-cols-2 gap-5 mt-5 transition-all lg:grid-cols-3">
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
