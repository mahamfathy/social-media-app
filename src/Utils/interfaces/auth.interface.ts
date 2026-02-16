import type { ApiResponse } from "./api.interface";

export interface Auth {
  token: string;
  tokenType: string;
  expiresIn: string;
  user: User;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  cover: string;
}
export type AuthInterface = ApiResponse<Auth>;
