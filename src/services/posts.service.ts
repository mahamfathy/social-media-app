import axiosInstance from "@/api/api.config";
import type { IPost } from "@/Utils/interfaces/post/post.interface";

export const postsService = {
  getFeed: async () => {
    const { data } = await axiosInstance.get<IPost>(
      "/posts/feed?only=following&limit=10",
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
};
