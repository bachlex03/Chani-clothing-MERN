import InvoiceListItem from '~/components/invoice-list-item';
import { ScrollArea } from '~/components/ui/scroll-area';
import { FaFileInvoiceDollar } from 'react-icons/fa6';

const tags = Array.from({ length: 10 }).map(
   (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export default function DashboardInvoices() {
   return (
      <div className="flex justify-between mt-20">
         <div className="dark:bg-[#142337] h-max w-[25%] mx-5 rounded-md">
            <h4 className="p-5 mb-4 text-base font-semibold leading-none pb-14">
               Invoice List
            </h4>
            <ScrollArea className="h-[50vh] w-full rounded-md border">
               <div className="">
                  {tags.map((tag, index) => (
                     <InvoiceListItem key={index} />
                  ))}
               </div>
            </ScrollArea>
         </div>

         <div className="bg-[#142337] w-[75%] mx-5 rounded-md p-5">
            <div>
               <h2 className="text-base font-medium">#TW15090257</h2>
               <p className="mt-3 text-sm font-normal text-slate-300">
                  Create: 10 July, 2023 Due: 10 July, 2023
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
                     <div className="flex flex-col items-center gap-4 px-3">
                        <p className="font-medium">#TW15090254</p>
                        <p className="text-sm text-slate-300">Invoice No</p>
                     </div>
                     <div className="flex flex-col items-center gap-4 px-10 border-l border-slate-500">
                        <p className="font-medium">10 July, 2023</p>
                        <p className="text-sm text-slate-300">Create Date</p>
                     </div>
                     <div className="flex flex-col items-center gap-4 px-10 border-l border-slate-500">
                        <p className="font-medium">paid</p>
                        <p className="text-sm text-slate-300">Payment Status</p>
                     </div>
                     <div className="flex flex-col items-center gap-4 px-10 border-l border-slate-500">
                        <p className="font-medium">$873.96</p>
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
                           <tr className="border-b border-gray-600/50">
                              <td className="text-base">1</td>
                              <td className="flex flex-col py-3">
                                 <p className="text-sm font-medium">
                                    Product - Premium Admin & Dashboard
                                 </p>
                                 <p className="mt-1 text-xs text-slate-400">
                                    Build with Bootstrap, React JS, Angular, Vue
                                    etc.
                                 </p>
                              </td>
                              <td>
                                 <p className="text-sm">2</p>
                              </td>
                              <td>
                                 <p className="text-sm">$48.00</p>
                              </td>
                           </tr>

                           <tr className="border-b border-gray-600/50">
                              <td className="text-base">1</td>
                              <td className="flex flex-col py-3">
                                 <p className="text-sm font-medium">
                                    Product - Premium Admin & Dashboard
                                 </p>
                                 <p className="mt-1 text-xs text-slate-400">
                                    Build with Bootstrap, React JS, Angular, Vue
                                    etc.
                                 </p>
                              </td>
                              <td>
                                 <p className="text-sm">2</p>
                              </td>
                              <td>
                                 <p className="text-sm">$48.00</p>
                              </td>
                           </tr>

                           <tr className="border-b border-gray-600/50">
                              <td colSpan={2}></td>
                              <td>
                                 <p className="py-3 text-sm">Sub Total</p>
                              </td>
                              <td>
                                 <p className="text-sm">$48.00</p>
                              </td>
                           </tr>

                           <tr className="border-b border-gray-600/50">
                              <td colSpan={2}></td>
                              <td>
                                 <p className="py-3 text-sm">Shipping Charge</p>
                              </td>
                              <td>
                                 <p className="text-sm">$0 </p>
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
                                 <p className="text-base font-semibold">$100</p>
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
