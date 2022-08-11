import { UserRole } from 'user/domain';
import { Option } from 'components/DataFieldProps';
import { pageSizeList } from 'type/Page';

export interface UserQuery {
  page: number;
  size: number;
  sort: string;
  keywordType: string;
  keyword: string;
  role: UserRole[] | undefined;
}

export const keywordTypeList: Option[] = [{
  key:  'by_username',
  text: '아이디'
}, {
  key:  'by_name',
  text: '이름'
}, {
  key:  'by_email',
  text: '이메일'
}];

export const initialUserQuery: UserQuery = {
  page:        0,
  size:        pageSizeList[0],
  sort:        'id,desc',
  keyword:     '',
  keywordType: keywordTypeList[0].key as string,
  role:        undefined
};
