export interface ILoginPayload {
   email: string;
   password: string;
}

export interface ILoginResponse {
   user: {
      email: string;
   };
   accessToken: string;
   refreshToken: string;
}

export interface ProductItem {
   id: string;
   name: string;
   price: number;
   quantity: number;
}
