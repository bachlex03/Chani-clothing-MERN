import CreateProductAside from '~/components/createProduct';
import Header from '~/components/Header';
import { ProductDataTable } from './data-table';

export default async function DashboardProducts() {
   return (
      <div className="w-full">
         <Header />

         <div className=" bg-five h-[85vh] mx-8 mt-20 px-5 rounded-lg">
            <div className="flex justify-end pt-5">
               <CreateProductAside />
            </div>

            <div className="mx-auto pt-5">
               <ProductDataTable />
            </div>
         </div>
      </div>
   );
}
