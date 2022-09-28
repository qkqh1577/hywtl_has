interface Page<T>
  extends Pagination {
  content: T[];
}

export interface Pagination {
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  empty: boolean;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}

export const pageSizeList = [10, 20, 50, 100];

export const initialPage: Page<any> = {
  content:          [],
  totalPages:       0,
  totalElements:    0,
  size:             pageSizeList[0],
  number:           0,
  empty:            true,
  first:            true,
  last:             true,
  numberOfElements: 0,
};

export default Page;
