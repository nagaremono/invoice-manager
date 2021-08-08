export interface PaginatedResult<T> {
  data: Array<T>;
  total: number;
  page: number;
  pages: number;
  take: number;
}
