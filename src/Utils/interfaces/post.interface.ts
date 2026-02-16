import type { ApiResponse } from "./api.interface";
import type { Like } from "./post-likes.interface";
import type { User } from "./user.interface";

export interface Post {
  _id: string;
  body?: string;
  privacy: string;
  image?: string;
  user: User | string | Like;
  sharedPost?: SharedPost | any;
  likes: string[] | any[];
  createdAt: string;
  commentsCount?: number;
  topComment?: TopComment;
  sharesCount?: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked?: boolean;
}

export interface SharedPost {
  _id: string;
  body?: string;
  image?: string;
  privacy: string;
  user: User;
  sharedPost: any;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment?: TopComment | any;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked?: boolean;
}

export interface TopComment {
  _id: string;
  content: string;
  image?: string;
  commentCreator: User;
  post: string;
  parentComment: any;
  likes: any[] | string[];
  createdAt: string;
}

export type IPost = ApiResponse<Post[]>;
