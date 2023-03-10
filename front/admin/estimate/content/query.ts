import { Option } from 'components/DataFieldProps';

export interface EstimateContentQuery {
  keywordType: string;
  keyword: string;
}

export const keywordTypeList: Option[] = [
  {
    key:  'by_name',
    text: '이름'
  }
];

export const initialEstimateContentQuery: EstimateContentQuery = {
  keyword:     '',
  keywordType: keywordTypeList[0].key as string,
};
