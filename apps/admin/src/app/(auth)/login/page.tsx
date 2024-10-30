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

const authSchema = z.object({
   email: z.string().email({ message: 'Invalid email address' }),
   password: z.string().min(6),
});

export default function Login() {
   const form = useForm<z.infer<typeof authSchema>>({
      resolver: zodResolver(authSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   const onLogin = (values: z.infer<typeof authSchema>) => {
      console.log(values);
   };

   return (
      <div className="container h-screen flex items-center">
         <div className="w-full p-[32px] rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
            <h2 className="text-[42px] font-bold">Sign in</h2>
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
