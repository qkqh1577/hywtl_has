import { pageSizeList } from 'type/Page';

export interface ProjectLogQuery {
  page?: number;
  size?: number;
  keyword?: string;
  tabName?: string;
  createdAt?: string;
}

export const initialProjectLogQuery: ProjectLogQuery = {
  page:      0,
  size:      pageSizeList[0],
  keyword:   '',
  tabName:   '',
  createdAt: undefined,
};
