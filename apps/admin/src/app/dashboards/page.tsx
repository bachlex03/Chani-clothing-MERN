import AppBarChart from '~/components/app-bar-chart';
import AppCard, { AppCardContent, AppCardProps } from '~/components/app-card';
import DonutChart from '~/components/donut-chart';

const CardData: AppCardProps[] = [
   {
      label: 'Total Revenue',
      amount: '$45,231.89',
      description: '+20.1% from last month',
      icon: 'applications',
   },
   {
      label: 'Users',
      amount: '+1,200',
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
      label: 'Active Now',
      amount: '+20',
      description: 'Products are active',
      icon: 'on-hold',
   },
];

export default function DashboardLayout() {
   return (
      <div className="mt-20 mx-5">
         <h2 className="text-2xl font-bold ml-5">Dashboard</h2>

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

         <section className="grid grid-cols-1 gap-5 transition-all lg:grid-cols-3 mt-5">
            <AppCardContent className="col-span-2">
               <p className="text-2xl font-bold ml-5 mt-5">Overview</p>
               <AppBarChart />
            </AppCardContent>

            <AppCardContent className="">
               <p className="text-2xl font-bold ml-5 mt-5">User Agents</p>
               <DonutChart />
            </AppCardContent>
         </section>
      </div>
   );
}
