import type { ApiResponse } from "../api.interface";
import type { Comment } from "../comment/comment.interface";
import type { User } from "./post-like.interface";

export interface Post {
  _id: string;
  body?: string;
  privacy: string;
  image?: string;
  user: User;
  sharedPost?: Post;
  likes: string[];
  createdAt: string;
  commentsCount?: number;
  topComment?: Comment;
  sharesCount?: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked?: boolean;
}

export type IPost = ApiResponse<{ posts?: Post[]; post?: Post }>;
