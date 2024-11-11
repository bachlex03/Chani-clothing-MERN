export interface IGetAllCategoriesResponse {
   _id: string;
   category_name: string;
   category_parentId: string | null;
   category_slug: string;
}

export interface IGetAllPromotionsResponse {
   _id: string;
   promotion_name: string;
   promotion_value: number;
   promotion_start_date: string;
   promotion_end_date: string;
   is_active: false;
   createdAt: string;
   updatedAt: string;
}

export interface ICategoryResponse {
   _id: string;
   category_name: string;
   category_parentId: string;
   category_promotion: string | null;
   createdAt: string;
   updatedAt: string;
   category_slug: string;
}

export interface ICreateCategoryPayload {
   name: string;
   parentId: string;
}

export interface IUpdateCategoryPayload {
   name: string;
   parentId: string;
}
