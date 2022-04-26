import { ProjectStatus } from 'services/project/entity';

export const projectStatusName = (status: ProjectStatus): string => {
  if (status === 'ON_GOING') {
    return '진행중';
  }
  if (status === 'TEMPLATE') {
    return '가등록';
  }
  return '';
};
export type ProjectFilterView = {
  page: number;
  size: number;
  keyword: string;
}

export type ProjectBasicView = {
  name: string;
  code: string;
  alias: string;
  salesManagerId: number | '';
  projectManagerId: number | '';
}

export const initProjectFilter: ProjectFilterView = {
  page: 0,
  size: 10,
  keyword: '',
};

export const initProjectBasic: ProjectBasicView = {
  name: '',
  code: '',
  alias: '',
  salesManagerId: '',
  projectManagerId: '',
};
