import axiosInstance from "@/api/api.config";
import type { IUserData } from "@/Utils/interfaces/user/user-data.interface";

export const ProfileService = {
  getProfile: async (userId: string) => {
    const { data } = await axiosInstance.get<IUserData>(
      `/users/${userId}/profile`,
    );
    return data;
  },
  followUnfollowProfile: async (userId: string) => {
    const { data } = await axiosInstance.put(`/users/${userId}/follow`, {});
    return data;
  },
};
