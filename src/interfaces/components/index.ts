export interface RectangleSpec {
  width: number | string;
  height: number | string;
}

export interface PageSpec<T> {
  content: T[];
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  totalPages: number;
  totalElements: number;
}
