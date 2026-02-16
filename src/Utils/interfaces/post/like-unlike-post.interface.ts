import type { ApiResponse } from "../api.interface";
import type { Post } from "./post.interface";

export interface LikeUnlikePayload {
  liked: boolean;
  likesCount: number;
  post: Post;
}

export type ILikeUnlikePost = ApiResponse<LikeUnlikePayload>;
