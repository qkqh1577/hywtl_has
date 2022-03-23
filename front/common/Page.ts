type Page<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  page: number;
}

export const initial: Page<any> = {
  content: [],
  totalPages: 0,
  totalElements: 0,
  size: 0,
  page: 0,
};

export default Page;
