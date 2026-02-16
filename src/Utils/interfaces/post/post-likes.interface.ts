import type { ApiResponse } from "../api.interface";

export interface Like {
  _id: string;
  name: string;
  username?: string;
  photo: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}
export type IPostLikes = ApiResponse<Like[]>;
