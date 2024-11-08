'use client';

import {
   Bar,
   BarChart,
   CartesianGrid,
   ResponsiveContainer,
   XAxis,
   YAxis,
} from 'recharts';
import {
   ChartConfig,
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from './ui/chart';
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from './ui/card';
import { TrendingUp } from 'lucide-react';

const data = [
   {
      name: 'Jan',
      total: Math.floor(Math.random() * 5000) + 1000,
   },
   {
      name: 'Feb',
      total: Math.floor(Math.random() * 5000) + 1000,
   },
   {
      name: 'Mar',
      total: Math.floor(Math.random() * 5000) + 1000,
   },
   {
      name: 'Apr',
      total: Math.floor(Math.random() * 5000) + 1000,
   },
   {
      name: 'May',
      total: Math.floor(Math.random() * 5000) + 1000,
   },
   {
      name: 'Jun',
      total: Math.floor(Math.random() * 5000) + 1000,
   },
   {
      name: 'Jul',
      total: Math.floor(Math.random() * 5000) + 1000,
   },
   {
      name: 'Aug',
      total: Math.floor(Math.random() * 5000) + 1000,
   },
   {
      name: 'Sep',
      total: Math.floor(Math.random() * 5000) + 1000,
   },
   {
      name: 'Oct',
      total: Math.floor(Math.random() * 5000) + 1000,
   },
   {
      name: 'Nov',
      total: Math.floor(Math.random() * 5000) + 1000,
   },
   {
      name: 'Dec',
      total: Math.floor(Math.random() * 5000) + 1000,
   },
];

const chartData = [
   { month: 'January', desktop: 186, mobile: 80 },
   { month: 'February', desktop: 305, mobile: 200 },
   { month: 'March', desktop: 237, mobile: 120 },
   { month: 'April', desktop: 73, mobile: 190 },
   { month: 'May', desktop: 209, mobile: 130 },
   { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
   desktop: {
      label: 'Desktop',
      color: 'hsl(var(--chart-1))',
   },
   mobile: {
      label: 'Mobile',
      color: 'hsl(var(--chart-2))',
   },
} satisfies ChartConfig;

export default function AppBarChart() {
   return (
      // <ResponsiveContainer width={'100%'} height={350}>
      //    <ChartContainer config={chartConfig}>
      //       <BarChart data={data}>
      //          <XAxis
      //             dataKey={'name'}
      //             axisLine={false}
      //             tickLine={false}
      //             tick={{ fill: '#9CA3AF' }}
      //             stroke="#888888"
      //             fontSize={12}
      //          />
      //          <YAxis
      //             axisLine={false}
      //             tickLine={false}
      //             stroke="#888888"
      //             fontSize={12}
      //             tickFormatter={(value) => `$${value}`}
      //          />
      //          <Bar dataKey={'total'} radius={[4, 4, 0, 0]} />
      //       </BarChart>
      //    </ChartContainer>
      // </ResponsiveContainer>

      <Card>
         <CardHeader>
            <CardTitle>Revenue by month</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
         </CardHeader>
         <CardContent>
            <ChartContainer config={chartConfig}>
               <BarChart accessibilityLayer data={data}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                     dataKey="name"
                     tickLine={false}
                     tickMargin={10}
                     axisLine={false}
                     tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                     axisLine={false}
                     tickLine={false}
                     stroke="#888888"
                     fontSize={12}
                     tickFormatter={(value) => `$${value}`}
                  />
                  <ChartTooltip
                     cursor={false}
                     content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar dataKey="total" fill="var(--color-desktop)" radius={4} />
               </BarChart>
            </ChartContainer>
         </CardContent>
         <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
               Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
               Showing total visitors for the last 6 months
            </div>
         </CardFooter>
      </Card>
   );
}
