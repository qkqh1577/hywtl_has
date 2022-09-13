import { pageSizeList } from 'type/Page';
import { Option } from 'components/DataFieldProps';

export interface ProjectLogQuery {
  page?: number;
  size?: number;
  keyword?: string;
  tabName?: string;
}

export const initialProjectLogQuery: ProjectLogQuery = {
  page: 0,
  size: pageSizeList[0],
  keyword: '',
  tabName: '',
}

export const tabNameList: Option[] = [
  {
    key: 'basic',
    text: '기본정보'
  },
  {
    key: 'complex',
    text: '단지정보'
  },
  {
    key: 'estimate-contract',
    text: '견적/계약'
  },
  {
    key: 'progress-information',
    text: '진행정보'
  },
  {
    key: 'document',
    text: '자료'
  },
  {
    key: 'schedule',
    text: '일정'
  },
  {
    key: 'log',
    text: '이력'
  },
];
