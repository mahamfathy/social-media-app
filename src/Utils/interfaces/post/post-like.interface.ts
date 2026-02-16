import type { ApiResponse } from "../api.interface";

export interface User {
  _id: string;
  name: string;
  username?: string;
  email?: string;
  photo: string;
  cover?: string;
  followersCount?: number;
  followingCount?: number;
  bookmarksCount?: number;
  id?: string;
}

export type IPostLikes = ApiResponse<User[]>;
