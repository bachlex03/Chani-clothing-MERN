/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import InvoiceListItem from '~/components/invoice-list-item';
import { ScrollArea } from '~/components/ui/scroll-area';
import { FaFileInvoiceDollar } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { getAllInvoices } from '~/services/invoices.service';
import { ApiError } from '~/common/errors/Api.error';
import { IGetAllInvoicesResponse } from '~/types/invoice.type';
import { toast } from '~/hooks/use-toast';

export default function DashboardInvoices() {
   const [invoices, setInvoices] = useState<IGetAllInvoicesResponse[]>([]);
   const [loading, setLoading] = useState(true);
   const [onSelect, setOnSelect] = useState<IGetAllInvoicesResponse>();

   useEffect(() => {
      async function fetchData() {
         const result = await getAllInvoices();

         if (result instanceof ApiError) {
            toast({
               variant: 'destructive',
               title: `${result.errorResponse?.message}`,
               description: `There was a problem with your request. ${result.errorResponse?.code}`,
            });

            setLoading(false);

            return;
         }

         if (result && 'invoices' in result) {
            setInvoices(result.invoices as IGetAllInvoicesResponse[]);
            setOnSelect((result.invoices as IGetAllInvoicesResponse[])[0]);
         }
      }

      fetchData();
   }, []);

   return (
      <div className="flex justify-between mt-20">
         <div className="dark:bg-[#142337] h-max w-[25%] mx-5 rounded-md">
            <h4 className="p-5 mb-4 text-base font-semibold leading-none pb-14">
               Invoice List
            </h4>
            <ScrollArea className="h-[50vh] w-full rounded-md border">
               <div className="">
                  {invoices.map((invoice, index) => (
                     <InvoiceListItem
                        key={index}
                        id={invoice._id}
                        name={
                           invoice.invoice_user.user_profile.profile_lastName +
                           ' ' +
                           invoice.invoice_user.user_profile.profile_firstName
                        }
                        total={invoice.invoice_total}
                        date={invoice.createdAt}
                        OnSelect={() => setOnSelect(invoice)}
                     />
                  ))}
               </div>
            </ScrollArea>
         </div>

         <div className="bg-[#142337] w-[75%] mx-5 rounded-md p-5">
            <div>
               <h2 className="text-base font-medium">
                  #{onSelect?._id ?? '#000000'}
               </h2>
               <p className="mt-3 text-sm font-normal text-slate-300">
                  {onSelect?.createdAt ?? '10 July, 2023'}
               </p>

               <div className="bg-[#1c2e45] p-5 rounded-md mt-5">
                  <div>
                     <i>
                        <FaFileInvoiceDollar className="text-4xl m-5 text-[#90a4bf]" />
                     </i>
                     <p className="text-sm font-medium">Chani Clothing Store</p>
                     <p className="text-[16px] text-slate-400 mt-2">
                        Group 1 Developments
                     </p>
                  </div>
                  <div className="flex justify-center gap-5 mt-6">
                     <div className="flex flex-col items-center gap-4 px-10 border-l border-slate-500">
                        <p className="font-medium">
                           {onSelect?.createdAt ?? ''}
                        </p>
                        <p className="text-sm text-slate-300">Create Date</p>
                     </div>
                     <div className="flex flex-col items-center gap-4 px-10 border-l border-slate-500">
                        <p className="font-medium">
                           {onSelect?.invoice_status ?? ''}
                        </p>
                        <p className="text-sm text-slate-300">Payment Status</p>
                     </div>
                     <div className="flex flex-col items-center gap-4 px-10 border-l border-slate-500">
                        <p className="font-medium">
                           {onSelect?.invoice_total
                              ? Number(onSelect?.invoice_total) / 25000
                              : '$0'}
                        </p>
                        <p className="text-sm text-slate-300">Total Amount</p>
                     </div>
                  </div>

                  <div className="mt-14">
                     <table className="w-full">
                        <thead>
                           <tr className="text-sm font-semibold text-[#90a4bf] border-b border-gray-600/50">
                              <td className="px-1 py-3">#</td>
                              <td className="py-3">Product Name</td>
                              <td className="py-3">Quantity</td>
                              <td className="py-3">Amount</td>
                           </tr>
                        </thead>

                        <tbody>
                           {onSelect?.invoice_products.map((product, index) => (
                              <tr
                                 key={index}
                                 className="border-b border-gray-600/50"
                              >
                                 <td className="text-base">1</td>
                                 <td className="flex flex-col py-3">
                                    <p className="text-sm font-medium">
                                       {product.product_name}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400 max-w-[500px]">
                                       Lorem ipsum dolor sit amet consectetur
                                       adipisicing elit. Perferendis temporibus
                                       alias quam et cupiditate quia unde
                                       consequatur libero beatae non?
                                    </p>
                                 </td>
                                 <td>
                                    <p className="text-sm">
                                       {product.product_quantity}
                                    </p>
                                 </td>
                                 <td>
                                    <p className="text-sm">
                                       ${product.product_final_price}
                                    </p>
                                 </td>
                              </tr>
                           ))}

                           <tr className="border-b border-gray-600/50">
                              <td colSpan={2}></td>
                              <td>
                                 <p className="py-3 text-sm">Shipping flat</p>
                              </td>
                              <td>
                                 <p className="text-sm">$0.00</p>
                              </td>
                           </tr>

                           <tr className="border-b border-gray-600/50">
                              <td colSpan={2}></td>
                              <td>
                                 <p className="py-3 text-sm">Sub Total</p>
                              </td>
                              <td>
                                 <p className="text-sm">
                                    $
                                    {onSelect?.invoice_total
                                       ? Number(onSelect?.invoice_total) / 25000
                                       : '$0'}
                                 </p>
                              </td>
                           </tr>

                           <tr className="border-b border-gray-600/50">
                              <td colSpan={2}></td>
                              <td>
                                 <p className="py-3 text-sm font-semibold">
                                    Total Amount
                                 </p>
                              </td>
                              <td>
                                 <p className="text-base font-semibold">
                                    $
                                    {onSelect?.invoice_total
                                       ? Number(onSelect?.invoice_total) / 25000
                                       : '$0'}
                                 </p>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>

                  <div className="mt-20">
                     <p className="p-3 text-sm rounded-md text-blue-300/70 bg-blue-400/10">
                        <strong>NOTES:</strong> All accounts are to be paid
                        within 7 days from receipt of invoice. To be paid by
                        cheque or credit card or direct payment online. If
                        account is not paid within 7 days the credits details
                        supplied as confirmation of work undertaken will be
                        charged the agreed quoted fee noted above.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
