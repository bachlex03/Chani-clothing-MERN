export interface IGetAllCategoriesResponse {
   _id: string;
   category_name: string;
   category_parentId: string | null;
   category_slug: string;
}
