import type { ApiResponse } from "../api.interface";
import type { User } from "../post/post-like.interface";

export interface Comment {
  _id: string;
  content: string;
  image?: string;
  commentCreator: User;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
  likesCount?: number;
  isReply?: boolean;
  id?: string;
  repliesCount?: number;
}

export type IComment = ApiResponse<{ comments?: Comment[]; comment?: Comment }>;
