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
