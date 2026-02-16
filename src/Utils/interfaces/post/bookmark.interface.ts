import type { ApiResponse } from "../api.interface";

export interface BookmarkPayload {
  bookmarked: boolean;
  bookmarksCount: number;
}

export type IBookMarkPost = ApiResponse<BookmarkPayload>;
