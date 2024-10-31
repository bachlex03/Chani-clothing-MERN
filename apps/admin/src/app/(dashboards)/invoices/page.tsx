import { ScrollArea } from '~/components/ui/scroll-area';
import { Separator } from '~/components/ui/separator';
import Button from '@mui/material/Button';

const tags = Array.from({ length: 10 }).map(
   (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export default function DashboardInvoices() {
   return (
      <div className="flex justify-between mt-20">
         <div className="bg-third w-[25%] mx-10">
            <ScrollArea className="h-72 w-48 rounded-md border">
               <div className="p-4">
                  <h4 className="mb-4 text-sm font-medium leading-none">
                     Tags
                  </h4>
                  {tags.map((tag) => (
                     <>
                        <div key={tag} className="text-sm">
                           {tag}
                        </div>
                        <Separator className="my-2" />
                     </>
                  ))}
               </div>
            </ScrollArea>
         </div>

         <div className="bg-third w-[65%] mx-10">
            block 2<Button>Test MUI</Button>
         </div>
      </div>
   );
}
