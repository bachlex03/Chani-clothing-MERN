import { FaArrowsSpin } from 'react-icons/fa6';
import { cn } from '~/lib/utils';

export type LoadingProps = {
   className?: string;
};

export default function Loading(props: LoadingProps) {
   return (
      <div
         className={cn(
            'absolute z-[999999] top-[0] bottom-[0] left-[0] right-[0] flex justify-center items-center bg-five/70',
            props.className,
         )}
      >
         <div className="ease-linear loader">
            <FaArrowsSpin className="text-3xl animate-spin-slow" />
         </div>
      </div>
   );
}
