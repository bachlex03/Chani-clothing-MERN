import { FaRegCalendarMinus } from 'react-icons/fa6';

export type InvoiceListItemProps = {
   id: string;
   name: string;
   total: number;
   date: string;
   OnSelect: () => void;
};

export default function InvoiceListItem(props: InvoiceListItemProps) {
   return (
      <div
         className="flex flex-col border-t dark:hover:bg-[#233a574d] dark:border-[#273956] cursor-pointer"
         onClick={() => {
            props.OnSelect();
         }}
      >
         <div className="p-5">
            <div className="flex items-center justify-between">
               <p className="text-sm font-semibold">#{props.id}</p>
               <span className="px-3 py-2 text-xs text-green-500 rounded-md bg-green-500/30">
                  Paid
               </span>
            </div>
            <h2 className="mt-3 font-semibold text-slate-50">{props.name}</h2>
            <div className="flex items-center justify-between mt-5">
               <p className="text-sm font-medium text-slate-300">
                  ${props.total / 25000}
               </p>
               <p className="relative text-sm font-medium text-slate-300">
                  <FaRegCalendarMinus className="inline mr-2 absolute -left-5 top-[1.5px]" />
                  {props.date}
               </p>
            </div>
         </div>
      </div>
   );
}
