interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const pageSizeList = [10, 20, 50, 100];

export const initialPage: Page<any> = {
  content:       [],
  totalPages:    0,
  totalElements: 0,
  size:          pageSizeList[0],
  number:        0,
};

export default Page;
