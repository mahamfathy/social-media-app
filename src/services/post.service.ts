import axiosInstance from "@/api/api.config";
import type { IPost } from "@/Utils/interfaces/post/post.interface";
import type { PostSchema } from "@/Utils/schemas/Post/Post.schema";

export const PostService = {
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
  getSinglePost: async (postId: string) => {
    const { data } = await axiosInstance.get<IPost>(`/posts/${postId}`);
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

  deletePost: async (postId: string) => {
    const { data } = await axiosInstance.delete(`/posts/${postId}`);
    return data;
  },

  updatePost: async (postId: string, values: PostSchema) => {
    const { data } = await axiosInstance.put(`/posts/${postId}`, values);
    return data;
  },

  toggleLike: async (postId: string) => {
    const { data } = await axiosInstance.put(`/posts/${postId}/like`);
    return data;
  },

  toggleBookmark: async (postId: string) => {
    const { data } = await axiosInstance.put(`/posts/${postId}/bookmark`);
    return data;
  },
};
