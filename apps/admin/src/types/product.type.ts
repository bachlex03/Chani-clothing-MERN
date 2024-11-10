export interface IProductResponse {
   _id: string;
   product_promotion: null;
   product_slug: string;
   product_brand: string;
   product_category: {
      category_promotion: null;
      _id: string;
      category_name: string;
      category_parentId: string;
      createdAt: string;
      updatedAt: string;
      category_slug: string;
   };
   product_code: string;
   product_colors: string[];
   product_description: string;
   product_gender: string;
   product_imgs: '';
   product_name: string;
   product_price: number;
   product_sizes: string[];
   product_status: string;
   product_stocks: number;
   product_type: string;
   current_discount: number;
   final_price: number;
}
