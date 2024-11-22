export interface IGetAllInvoicesResponse {
   _id: string;
   invoice_user: {
      _id: string;
      email: string;
      user_profile: {
         _id: string;
         profile_firstName: string;
         profile_lastName: string;
         profile_phoneNumber: string;
         profile_address: {
            _id: string;
            address_country: string;
            address_province: string;
            address_district: string;
            address_addressLine: string;
         };
      };
   };
   invoice_products: [
      {
         _id: string;
         product_name: string;
         product_description: string;
         product_size: string[];
         product_color: string[];
         product_quantity: number;
         product_price: string;
         product_final_price: string;
         product_discount: string;
      },
   ];
   invoice_note: string;
   invoice_status: string;
   invoice_total: number;
   createdAt: string;
   updatedAt: string;
}
