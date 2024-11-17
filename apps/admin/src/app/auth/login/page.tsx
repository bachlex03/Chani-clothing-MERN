/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '~/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { authSchema } from '~/schemaValidations/authSchema';
import * as authServices from '~/services/auth/login.services';
import * as userServices from '~/services/user.service';
import { ApiError } from '~/common/errors/Api.error';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from '~/hooks/use-toast';
import { useEffect, useState } from 'react';
import { withNoAuth } from '~/hooks/with-no-auth-hoc';

const Login = () => {
   const router = useRouter();
   const [loading, setLoading] = useState(true); // Added loading state

   const form = useForm<z.infer<typeof authSchema>>({
      resolver: zodResolver(authSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   const onLogin = async (values: z.infer<typeof authSchema>) => {
      const result = await authServices.login(values);

      if (result instanceof ApiError) {
         console.log(result.errorResponse);

         toast({
            variant: 'destructive',
            title: `Account ${result.errorResponse?.message}`,
            description: `There was a problem with your request. ${result.errorResponse?.code}`,
         });

         return;
      }

      toast({
         title: 'Login successful',
         className: 'bg-[green] dark:bg-[green] text-white dark:text-white',
      });

      if (result.accessToken) {
         Cookies.set('access-token', result.accessToken);

         router.push('/dashboards');
      }
   };

   useEffect(() => {
      const checkAuth = async () => {
         const token = Cookies.get('access-token');
         if (!token) {
            setLoading(false); // No token, stop loading
            return;
         }

         const result = await userServices.getProfile();

         if (result instanceof ApiError) {
            console.log(result.errorResponse);

            toast({
               variant: 'destructive',
               title: `Session expired. Please login again`,
            });

            setLoading(false); // Token invalid, stop loading
            return;
         }

         // Valid token, redirect
         router.push('/dashboards');
      };

      checkAuth();
   }, [router]);

   if (loading) {
      return (
         <div className="flex items-center justify-center h-screen">
            Loading...
         </div>
      );
   }

   return (
      <div className="container flex items-center h-screen">
         <div className="w-full p-[32px] rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
            <h2 className="text-[42px] font-bold dark:text-black">
               Administrator login
            </h2>
            <div>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onLogin)} className="">
                     <div>
                        <FormField
                           control={form.control}
                           name="email"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Email</FormLabel>
                                 <FormControl>
                                    <Input
                                       placeholder="Email"
                                       {...field}
                                       className="rounded-xl dark:bg-slate-50 dark:text-five text-five"
                                       type="email"
                                       required={true}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>

                     <div className="mt-3">
                        <FormField
                           control={form.control}
                           name="password"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel className="mb-5">
                                    Password
                                 </FormLabel>
                                 <FormControl>
                                    <Input
                                       placeholder="password"
                                       {...field}
                                       className="rounded-xl dark:bg-slate-50 dark:hover:bg-slate-50 dark:text-five text-five"
                                       type="password"
                                       required={true}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     <Button
                        className="w-full mt-5 rounded-3xl dark:bg-five dark:text-white dark:hover:bg-five/80 dark:hover:text-white"
                        type="submit"
                     >
                        Sign in
                     </Button>
                  </form>
               </Form>
            </div>
         </div>
      </div>
   );
};

export default withNoAuth(Login);
