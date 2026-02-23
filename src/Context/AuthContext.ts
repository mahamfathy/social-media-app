import type { IUserData } from "@/Utils/interfaces/user/user-data.interface";
import { createContext } from "react";

export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  userData: IUserData | undefined;
  setUserData: (userData: IUserData | undefined) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
