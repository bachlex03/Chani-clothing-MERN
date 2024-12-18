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
   product_imgs: IProductImage[];
   product_name: string;
   product_price: number;
   product_sizes: string[];
   product_status: string;
   product_stocks: number;
   product_type: string;
   current_discount: number;
   final_price: number;
}

export interface IProductImage {
   secure_url: string;
   public_id: string;
}

type sizeEnum = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL';

export interface ICreateProductPayload {
   name: string;
   description: string;
   gender: string;
   type: string;
   brand: string;
   images: IProductImage[];
   categoryId: string;
   category: string;
   sizes: sizeEnum[];
   color: string;
   price: string;
   quantity: string;
   status: string;
}

export interface IUpdateProductPayload {
   name: string;
   description: string;
   gender: string;
   type: string;
   brand: string;
   categoryId: string;
   price: string;
   status: string;
}
