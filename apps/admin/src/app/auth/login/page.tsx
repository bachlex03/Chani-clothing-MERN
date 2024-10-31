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
import { ApiError } from '~/common/errors/Api.error';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from '~/hooks/use-toast';

export default function Login() {
   const router = useRouter();

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

   return (
      <div className="container h-screen flex items-center">
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
                                       className="rounded-xl"
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
                                       className="rounded-xl"
                                       type="password"
                                       required={true}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     <Button className="w-full rounded-3xl mt-5" type="submit">
                        Sign in
                     </Button>
                  </form>
               </Form>
            </div>
         </div>
      </div>
   );
}
