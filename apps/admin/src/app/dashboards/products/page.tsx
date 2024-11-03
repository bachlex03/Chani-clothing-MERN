import { columns } from '~/components/columns';
import CreateProductAside from '~/components/createProduct';
import CreateProduct from '~/components/createProduct';
import DataTable from '~/components/dataTable';
import Header from '~/components/Header';
import ProductDetails from '~/components/productDetails';
import { Button } from '~/components/ui/button';

type Payment = {
   id: string;
   amount: number;
   status: 'pending' | 'processing' | 'success' | 'failed';
   email: string;
};

export const payments: Payment[] = [
   {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
   },
   {
      id: '489e1d42',
      amount: 125,
      status: 'processing',
      email: 'example@gmail.com',
   },
   // ...
];

export default async function DashboardProducts() {
   return (
      <div className="w-full">
         <Header />

         <div className=" bg-primary h-[500px] mx-8 mt-20 px-5 rounded-lg">
            <div className="flex justify-end pt-5">
               <CreateProductAside />
            </div>

            <div className="mx-auto py-10">
               {/* <DataTable columns={columns} data={data} /> */}
            </div>
         </div>
      </div>
   );
}
