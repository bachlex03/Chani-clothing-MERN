import { FaArrowsSpin } from 'react-icons/fa6';

export default function Loading() {
   return (
      <div className="absolute z-[999999] top-[0] bottom-[0] left-[0] right-[0] flex justify-center items-center bg-five/70">
         <div className="loader ease-linear">
            <FaArrowsSpin className="text-3xl animate-spin-slow" />
         </div>
      </div>
   );
}
