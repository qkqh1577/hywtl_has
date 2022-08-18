import { Option } from 'components/DataFieldProps';
import { pageSizeList } from 'type/Page';

export interface BusinessQuery {
  page: number;
  size: number;
  sort: string;
  keywordType?: string;
  keyword?: string;
}

export const keywordTypeList: Option[] = [
  {
    key:  'by_name',
    text: '업체명',
  },
  {
    key:  'by_ceo_name',
    text: '대표명',
  },
  {
    key:  'by_registration_number',
    text: '사업자번호',
  }
];

export const initialBusinessQuery: BusinessQuery = {
  page:        0,
  size:        pageSizeList[0],
  sort:        'id,desc',
  keyword:     '',
  keywordType: keywordTypeList[0].key as string,
};

export interface RegistrationNumberQuery {
  registrationNumber: string;
}
