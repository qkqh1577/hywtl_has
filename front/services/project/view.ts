export type ProjectFilterView = {
  page: number;
  size: number;
  keyword: string;
}

export const initProjectFilter: ProjectFilterView = {
  page: 0,
  size: 10,
  keyword: '',
};