import { pageSizeList } from 'type/Page';
import { Option } from 'components/DataFieldProps';

export interface ProjectLogQuery {
  page?: number;
  size?: number;
  keyword?: string;
  tabName?: string;
  createdAt? : Date;
}

export const initialProjectLogQuery: ProjectLogQuery = {
  page: 0,
  size: pageSizeList[0],
  keyword: '',
  tabName: '',
  createdAt: undefined,
}

export const tabNameList: Option[] = [
  {
    key: 'BASIC',
    text: '기본정보'
  },
  {
    key: 'COMPLEX',
    text: '단지정보'
  },
  {
    key: 'ESTIMATE_CONTRACT',
    text: '견적/계약'
  },
  {
    key: 'PROGRESS_INFORMATION',
    text: '진행정보'
  },
  {
    key: 'DOCUMENT',
    text: '자료'
  },
  {
    key: 'SCHEDULE',
    text: '일정'
  },
  {
    key: 'LOG',
    text: '이력'
  },
];
