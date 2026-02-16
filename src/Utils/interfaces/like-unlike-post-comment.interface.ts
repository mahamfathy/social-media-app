import type { ApiResponse } from "./api.interface";
import type { Comment } from "./comment/comment.interface";
import type { Post } from "./post/post.interface";

export interface LikeUnlikePayload {
  liked: boolean;
  likesCount: number;
  post?: Post;
  comment?: Comment;
}

export type ILikeUnlikePost = ApiResponse<LikeUnlikePayload>;
export type ILikeUnlikeComment = ApiResponse<LikeUnlikePayload>;
