/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { toast } from '~/hooks/use-toast';
import { Button } from './ui/button';
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from './ui/sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AppInput from './app-input';

const FormSchema = z.object({
   name: z
      .string()
      .max(40, {
         message: 'Product title must not be exceed 40 characters.',
      })
      .min(2, {
         message: 'Product title must be at least 2 characters.',
      }),
   description: z.string().min(2, {
      message: 'Product description must be at least 2 characters..',
   }),
   gender: z.string().min(2, {
      message: 'Product description must be at least 2 characters..',
   }),
   type: z.string().min(2, {
      message: 'Product description must be at least 2 characters..',
   }),
   brand: z.string().min(2, {
      message: 'Product description must be at least 2 characters..',
   }),
   categoryId: z.string().min(2, {
      message: 'Product description must be at least 2 characters..',
   }),
   category: z.string().min(2, {
      message: 'Product description must be at least 2 characters..',
   }),
   color: z.string().min(2, {
      message: 'Product description must be at least 2 characters..',
   }),
   price: z.string().min(2, {
      message: 'Product description must be at least 2 characters..',
   }),
   quantity: z.number().min(1, {
      message: 'Product quantity must be at least 1.',
   }),
   status: z.string().min(2, {
      message: 'Product description must be at least 2 characters..',
   }),
});

export default function CreateProductAside() {
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         name: '',
         description: '',
         gender: '',
         type: '',
         brand: '',
         categoryId: '',
         category: '',
         color: '',
         price: '',
         quantity: 1,
         status: '',
      },
   });

   function onSubmit(data: z.infer<typeof FormSchema>) {
      toast({
         title: 'You submitted the following values:',
         description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
               <code className="text-white">
                  {JSON.stringify(data, null, 2)}
               </code>
            </pre>
         ),
      });
   }

   return (
      <div>
         <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent className="w-[80%]">
               <SheetHeader>
                  <SheetTitle>Add Product</SheetTitle>
               </SheetHeader>

               <div className="flex justify-between">
                  <div>
                     <ScrollArea className="h-[700px] w-[900px] mt-5 rounded-md border p-4">
                        <div className="w-full px-5">
                           <Form {...form}>
                              <form
                                 onSubmit={form.handleSubmit(onSubmit)}
                                 className=" w-full space-y-6"
                              >
                                 <AppInput
                                    name="name"
                                    form={form as any}
                                    label="Product title"
                                    description="Do not exceed 40 characters when
                                             entering the name."
                                 />
                                 {/* <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Product title</FormLabel>
                                          <FormControl>
                                             <Input
                                                placeholder="Product title"
                                                {...field}
                                                className="w-full"
                                             />
                                          </FormControl>
                                          <FormDescription>
                                             Do not exceed 40 characters when
                                             entering the name.
                                          </FormDescription>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 /> */}
                                 <Button type="submit">Submit</Button>
                              </form>
                           </Form>
                        </div>
                     </ScrollArea>
                  </div>

                  <div className="bg-third w-[350px]">right block</div>
               </div>
            </SheetContent>
         </Sheet>
      </div>
   );
}
