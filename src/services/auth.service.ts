import axiosInstance from "@/api/api.config";
import type { AuthSchema } from "@/Pages/Auth/Auth.schema";
import type { IAuth } from "@/Utils/interfaces/auth/auth.interface";

export const AuthService = {
  login: async (values: Pick<AuthSchema, "email" | "password">) => {
    const { data } = await axiosInstance.post<IAuth>("/users/signin", values);
    return data;
  },
  register: async (values: AuthSchema) => {
    const { data } = await axiosInstance.post<IAuth>("/users/signup", values);
    return data;
  },
};
