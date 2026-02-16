export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: Meta;
  errors?: string | string[];
}
export interface Meta {
  feedMode?: string;
  pagination: Pagination;
}

export interface Pagination {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  total: number;
}
