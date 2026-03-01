import type { ApiResponse } from "../api.interface";
import type { User } from "../user/user-data.interface";

export interface Reply {
  _id: string;
  content: string;
  image?: string;
  commentCreator: User;
  post: string;
  parentComment: string;
  likes: string[];
  createdAt: string;
  likesCount: number;
  isReply: boolean;
  id: string;
}

export type IReply = ApiResponse<{ reply: Reply; replies: Reply[] }>;
