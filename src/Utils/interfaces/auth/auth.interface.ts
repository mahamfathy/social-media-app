import type { ApiResponse } from "../api.interface";
import type { User } from "../post/user.interface";

export interface Auth {
  token: string;
  tokenType: string;
  expiresIn: string;
  user: User;
}

export type IAuth = ApiResponse<Auth>;
