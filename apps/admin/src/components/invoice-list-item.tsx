import { FaRegCalendarMinus } from 'react-icons/fa6';

export default function InvoiceListItem() {
   return (
      <div className="flex flex-col border-t dark:hover:bg-[#233a574d] dark:border-[#273956] cursor-pointer">
         <div className="p-5">
            <div className="flex justify-between items-center">
               <p className="text-sm font-semibold">#TW15090251</p>
               <span className="text-xs px-3 py-2 text-green-500 bg-green-500/30 rounded-md">
                  Paid
               </span>
            </div>
            <h2 className="mt-3 font-semibold text-slate-50">Paula Keenan</h2>
            <div className="flex justify-between items-center mt-5">
               <p className="text-sm text-slate-300 font-medium">$873.96</p>
               <p className="text-sm text-slate-300 font-medium relative">
                  <FaRegCalendarMinus className="inline mr-2 absolute -left-5 top-[1.5px]" />
                  21 Jan, 2024
               </p>
            </div>
         </div>
      </div>
   );
}
