import { pageSizeList } from 'type/Page';

export interface ProjectQuery {
  name: string;
  page: number;
  size: number;
}

export const initialProjectQuery: ProjectQuery = {
  name: '',
  page: 0,
  size: pageSizeList[0]
};