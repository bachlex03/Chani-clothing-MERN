'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CategoryItem from '~/components/categoryItem';
import Header from '~/components/Header';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '~/components/ui/dialog';
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '~/components/ui/popover';
import { toast } from '~/hooks/use-toast';
import { cn } from '~/lib/utils';
import { FaCaretRight, FaCheck } from 'react-icons/fa';
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from '~/components/ui/command';

const languages = [
   { label: 'Parent Name 1', value: 1 },
   { label: 'Parent Name 2', value: 2 },
   { label: 'Parent Name 3', value: 3 },
] as const;

const CreateFormSchema = z.object({
   isParent: z.boolean().default(false).optional(),
   language: z.string({
      required_error: 'Please select a language.',
   }),
});

export default function DashboardCategories() {
   const form = useForm<z.infer<typeof CreateFormSchema>>({
      resolver: zodResolver(CreateFormSchema),
   });

   function onSubmit(data: z.infer<typeof CreateFormSchema>) {
      console.log(data);

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
      <div className="mt-32 mx-20 rounded-xl bg-third">
         <div className="flex justify-end">
            <Dialog>
               <DialogTrigger asChild>
                  <Button variant="outline">Edit Profile</Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                     <DialogTitle>Add new category</DialogTitle>
                     <DialogDescription>
                        Make changes category here. Click save when you're done.
                     </DialogDescription>
                  </DialogHeader>

                  <Form {...form}>
                     <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                     >
                        <FormField
                           control={form.control}
                           name="isParent"
                           render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                 <FormControl>
                                    <Checkbox
                                       checked={field.value}
                                       onCheckedChange={field.onChange}
                                    />
                                 </FormControl>
                                 <div className="space-y-1 leading-none">
                                    <FormLabel>
                                       This is not parent category
                                    </FormLabel>
                                 </div>
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="language"
                           render={({ field }) => (
                              <FormItem className="flex flex-col">
                                 <FormLabel>Language</FormLabel>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                       <FormControl>
                                          <Button
                                             variant="outline"
                                             role="combobox"
                                             className={cn(
                                                'w-[200px] justify-between',
                                                !field.value &&
                                                   'text-muted-foreground',
                                             )}
                                          >
                                             {field.value
                                                ? languages.find(
                                                     (language) =>
                                                        language.value ===
                                                        field.value,
                                                  )?.label
                                                : 'Select language'}
                                             <FaCaretRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                          </Button>
                                       </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                       <Command>
                                          <CommandInput
                                             placeholder="Search framework..."
                                             className="h-9"
                                          />
                                          <CommandList>
                                             <CommandEmpty>
                                                No framework found.
                                             </CommandEmpty>
                                             <CommandGroup>
                                                {languages.map((language) => (
                                                   <CommandItem
                                                      value={language.label}
                                                      key={language.value}
                                                      onSelect={() => {
                                                         form.setValue(
                                                            'language',
                                                            language.value,
                                                         );
                                                      }}
                                                   >
                                                      {language.label}
                                                      <FaCheck
                                                         className={cn(
                                                            'ml-auto h-4 w-4',
                                                            language.value ===
                                                               field.value
                                                               ? 'opacity-100'
                                                               : 'opacity-0',
                                                         )}
                                                      />
                                                   </CommandItem>
                                                ))}
                                             </CommandGroup>
                                          </CommandList>
                                       </Command>
                                    </PopoverContent>
                                 </Popover>
                              </FormItem>
                           )}
                        />
                        <Button type="submit">Submit</Button>
                     </form>
                  </Form>

                  <div className="grid gap-4 py-4">
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                           Name
                        </Label>
                        <Input
                           id="name"
                           value="Pedro Duarte"
                           className="col-span-3"
                        />
                     </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                           Description
                        </Label>
                        <Input
                           id="username"
                           value="@peduarte"
                           className="col-span-3"
                        />
                     </div>
                  </div>
                  <DialogFooter>
                     <Button type="submit">Save changes</Button>
                  </DialogFooter>
               </DialogContent>
            </Dialog>
         </div>
         <div className="flex gap-5 p-5">
            <CategoryItem />
         </div>
      </div>
   );
}
