'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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
      total: 0,
   },
   {
      name: 'Feb',
      total: 0,
   },
   {
      name: 'Mar',
      total: 0,
   },
   {
      name: 'Apr',
      total: 0,
   },
   {
      name: 'May',
      total: 0,
   },
   {
      name: 'Jun',
      total: 0,
   },
   {
      name: 'Jul',
      total: 0,
   },
   {
      name: 'Aug',
      total: 0,
   },
   {
      name: 'Sep',
      total: 0,
   },
   {
      name: 'Oct',
      total: 0,
   },
   {
      name: 'Nov',
      total: 1213,
   },
   {
      name: 'Dec',
      total: 0,
      // total: Math.floor(Math.random() * 5000) + 1000,
   },
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
               Trending up by 5.2% this month <TrendingUp className="w-4 h-4" />
            </div>
            <div className="leading-none text-muted-foreground">
               Showing total visitors for the last 6 months
            </div>
         </CardFooter>
      </Card>
   );
}
