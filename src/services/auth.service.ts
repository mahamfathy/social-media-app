import axiosInstance from "@/api/api.config";
import type { IAuth } from "@/Utils/interfaces/auth/auth.interface";
import type { IUserData } from "@/Utils/interfaces/user/user-data.interface";
import type { AuthSchema } from "@/Utils/schemas/Auth/Auth.schema";
import type { ChangePasswordSchema } from "@/Utils/schemas/ChangePassword/ChangePassword.schema";
export const AuthService = {
  login: async (values: Pick<AuthSchema, "email" | "password">) => {
    const { data } = await axiosInstance.post<IAuth>("/users/signin", values);
    return data;
  },
  register: async (values: AuthSchema) => {
    const { data } = await axiosInstance.post<IAuth>("/users/signup", values);
    return data;
  },
  getUserData: async () => {
    const { data } = await axiosInstance.get<IUserData>("/users/profile-data");
    return data;
  },
  changePassword: async (
    values: Pick<ChangePasswordSchema, "password" | "newPassword">,
  ) => {
    const { data } = await axiosInstance.patch(
      `/users/change-password`,
      values,
    );
    return data;
  },
  getSuggestions: async (limit = 20, page = 1, search: string) => {
    const endpoint = search ? "/users/search" : "/users/suggestions";

    const { data } = await axiosInstance.get(
      `${endpoint}?page=${page}&limit=${limit}&q=${search}`,
    );
    return data;
  },
};
