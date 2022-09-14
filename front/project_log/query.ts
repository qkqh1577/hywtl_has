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
    key: '기본정보',
    text: '기본정보'
  },
  {
    key: '단지정보',
    text: '단지정보'
  },
  {
    key: '견적/계약',
    text: '견적/계약'
  },
  {
    key: '진행정보',
    text: '진행정보'
  },
  {
    key: '자료',
    text: '자료'
  },
  {
    key: '일정',
    text: '일정'
  },
  {
    key: '이력',
    text: '이력'
  },
];
