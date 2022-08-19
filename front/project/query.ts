import { pageSizeList } from 'type/Page';

export interface ProjectQuery {
  keyword: string;
  page: number;
  size: number;
}

export const initialProjectQuery: ProjectQuery = {
  keyword: '',
  page: 0,
  size: pageSizeList[0]
};