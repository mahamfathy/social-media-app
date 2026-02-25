import axiosInstance from "@/api/api.config";
import type { IPost } from "@/Utils/interfaces/post/post.interface";

export const postsService = {
  getFeed: async (type: string) => {
    const { data } = await axiosInstance.get<IPost>(
      `/posts/feed?only=${type}&limit=10`,
    );
    return data;
  },
  getCommunityPosts: async () => {
    const { data } = await axiosInstance.get<IPost>("/posts");
    return data;
  },
  addPost: async (formData: FormData) => {
    const { data } = await axiosInstance.post("/posts", formData);
    return data;
  },
  getSavedPosts: async () => {
    const { data } = await axiosInstance.get(
      "/users/bookmarks?limit=20&page=1",
    );
    return data;
  },
  getUserPosts: async (userId: string) => {
    const { data } = await axiosInstance.get(
      `/users/${userId}/posts?page=1&limit=20`,
    );
    return data;
  },
};
