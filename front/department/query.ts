import {
  DepartmentCategory,
  DepartmentId
} from 'department/domain';
import { Option } from 'components/DataFieldProps';
import { pageSizeList } from 'type/Page';

export interface DepartmentQuery {
  page: number;
  size: number;
  sort: string;
  parentId: DepartmentId[] | undefined;
  category: DepartmentCategory[] | undefined;
  keywordType: string;
  keyword: string;
}

export const keywordTypeList: Option[] = [{
  key:  'by_name',
  text: '조직명'
}];

export const initialDepartmentQuery: DepartmentQuery = {
  page:        0,
  size:        pageSizeList[0],
  sort:        'id,desc',
  keyword:     '',
  keywordType: keywordTypeList[0].key as string,
  parentId:    undefined,
  category:    undefined,
};