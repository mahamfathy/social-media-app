import axiosInstance from "@/api/api.config";
import type { IComment } from "@/Utils/interfaces/comment/comment.interface";

export const CommentService = {
  getPostComments: async (postId: string, page?: number, limit?: number) => {
    const { data } = await axiosInstance.get<IComment>(
      `/posts/${postId}/comments`,
      {
        params: { page, limit },
      },
    );
    return data;
  },

  addComment: async (postId: string, formData: FormData) => {
    const { data } = await axiosInstance.post<IComment>(
      `/posts/${postId}/comments`,
      formData,
    );
    return data;
  },

  getCommentReplies: async (
    postId: string,
    commentId: string,
    page: number = 1,
    limit: number = 10,
  ) => {
    const { data } = await axiosInstance.get(
      `/posts/${postId}/comments/${commentId}/replies`,
      { params: { page, limit } },
    );
    return data;
  },

  addReply: async (postId: string, commentId: string, content: string) => {
    const { data } = await axiosInstance.post(
      `/posts/${postId}/comments/${commentId}/replies`,
      { content },
    );
    return data;
  },

  updateComment: async (
    postId: string,
    commentId: string,
    formData: FormData,
  ) => {
    const { data } = await axiosInstance.put<IComment>(
      `/posts/${postId}/comments/${commentId}`,
      formData,
    );
    return data;
  },

  deleteComment: async (postId: string, commentId: string) => {
    const { data } = await axiosInstance.delete(
      `/posts/${postId}/comments/${commentId}`,
    );
    return data;
  },

  likeUnlikeComment: async (postId: string, commentId: string) => {
    const { data } = await axiosInstance.put(
      `/posts/${postId}/comments/${commentId}/like`,
    );
    return data;
  },
};
