'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '~/components/ui/card';
import {
   ChartConfig,
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from '~/components/ui/chart';

export const description = 'A multiple line chart';

const chartData = [
   { month: 'January', desktop: 186, mobile: 20 },
   { month: 'February', desktop: 305, mobile: 200 },
   { month: 'March', desktop: 237, mobile: 120 },
   { month: 'April', desktop: 200, mobile: 190 },
   { month: 'May', desktop: 209, mobile: 130 },
   { month: 'June', desktop: 200, mobile: 140 },
   { month: 'July', desktop: 186, mobile: 80 },
   { month: 'August', desktop: 305, mobile: 200 },
   { month: 'September', desktop: 290, mobile: 190 },
   { month: 'October', desktop: 210, mobile: 190 },
   { month: 'November', desktop: 209, mobile: 130 },
   { month: 'December', desktop: 214, mobile: 140 },
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

export function AppLineChart() {
   return (
      <Card>
         <CardHeader>
            <CardTitle>Desktop - Mobile Agent</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
         </CardHeader>
         <CardContent>
            <ChartContainer config={chartConfig}>
               <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                     left: 12,
                     right: 12,
                  }}
               >
                  <CartesianGrid vertical={false} />
                  <XAxis
                     dataKey="month"
                     tickLine={false}
                     axisLine={false}
                     tickMargin={8}
                     tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                     axisLine={false}
                     tickLine={false}
                     stroke="#888888"
                     fontSize={12}
                  />
                  <ChartTooltip
                     cursor={false}
                     content={<ChartTooltipContent />}
                  />
                  <Line
                     dataKey="desktop"
                     type="monotone"
                     stroke="var(--color-desktop)"
                     strokeWidth={2}
                     dot={false}
                  />
                  <Line
                     dataKey="mobile"
                     type="monotone"
                     stroke="var(--color-mobile)"
                     strokeWidth={2}
                     dot={false}
                  />
               </LineChart>
            </ChartContainer>
         </CardContent>
         <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
               <div className="grid gap-2">
                  <div className="flex items-center gap-2 font-medium leading-none">
                     Trending up by 5.2% this month{' '}
                     <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2 leading-none text-muted-foreground">
                     Showing total visitors for the last 6 months
                  </div>
               </div>
            </div>
         </CardFooter>
      </Card>
   );
}