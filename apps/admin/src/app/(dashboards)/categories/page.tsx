'use client';

import CategoryItem from '~/components/categoryItem';
import Header from '~/components/Header';

export default function DashboardCategories() {
   return (
      <div className="mt-32 mx-20 rounded-xl bg-third">
         <div className="flex gap-5 p-5">
            <CategoryItem />
         </div>
      </div>
   );
}
