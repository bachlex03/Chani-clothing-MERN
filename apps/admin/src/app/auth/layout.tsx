import type { Metadata } from 'next';
import '~/styles/globals.css';
import Image from 'next/image';
import images from '../../../public/images';

export const metadata: Metadata = {
   title: 'Create Next App',
   description: 'Generated by create next app',
};

export default function AuthLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="flex flex-row dark:bg-white">
         <div className="w-[70%] h-screen bg-[#f2f8f8]">
            <div className="relative w-[50%] h-[100%] left-[25%]">
               <Image src={images.loginBg} alt="project" fill />
            </div>
         </div>
         <div className="w-[30%]">{children}</div>
      </div>
   );
}
