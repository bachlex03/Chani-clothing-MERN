/* eslint-disable react/no-unescaped-entities */
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from './ui/sheet';

export default function ProductDetails() {
   return (
      <div>
         <Sheet>
            <SheetTrigger asChild>
               <Button variant="outline">Open</Button>
            </SheetTrigger>

            <SheetContent>
               <SheetHeader>
                  <SheetHeader>
                     <SheetTitle>Edit profile</SheetTitle>

                     <SheetDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                     </SheetDescription>
                  </SheetHeader>
               </SheetHeader>

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
                        Username
                     </Label>

                     <Input
                        id="username"
                        value="@peduarte"
                        className="col-span-3"
                     />
                  </div>
               </div>

               <SheetFooter>
                  <SheetClose asChild>
                     <Button type="submit">Save changes</Button>
                  </SheetClose>
               </SheetFooter>
            </SheetContent>
         </Sheet>
      </div>
   );
}
