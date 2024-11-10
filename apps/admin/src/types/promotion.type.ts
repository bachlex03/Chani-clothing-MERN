export interface ICreatePromotionPayload {
   name: string;
   value: number;
   startDate: string;
   endDate: string;
   categoryId: string;
}

export interface IUpdatePromotionPayload {
   id: string;
   name: string;
   value: number;
   startDate: string;
   endDate: string;
   // categoryId: string;
}

export interface IDeletePromotionPayload {
   id: string;
}

export interface ICreatePromotionResponse {
   promotion_name: string;
   promotion_value: number;
   promotion_start_date: string;
   promotion_end_date: string;
   category_id: string;
   _id: string;
   createdAt: string;
   updatedAt: string;
   is_active: boolean;
}
