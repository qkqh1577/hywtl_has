import { pageSizeList } from 'type/Page';

export interface ProjectLogQuery {
  page?: number;
  size?: number;
  sort?: string;
  keyword?: string;
  tabName?: string;
  createdAt?: string;
}

export const initialProjectLogQuery: ProjectLogQuery = {
  page:      0,
  size:      pageSizeList[0],
  sort:      'id desc',
  keyword:   '',
  tabName:   '',
  createdAt: undefined,
};
