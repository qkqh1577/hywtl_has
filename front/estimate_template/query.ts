import { TestType } from 'estimate_template/domain';
import { Option } from 'components/DataFieldProps';

export interface EstimateTemplateQuery {
  sort: string;
  testType: TestType[] | undefined;
  keywordType: string;
  keyword: string;
}

export const keywordTypeList: Option[] = [{
  key:  'by_title',
  text: '용역 항목',
}];

export const initialEstimateTemplateQuery: EstimateTemplateQuery = {
  sort:        'id,desc',
  testType:    undefined,
  keywordType: keywordTypeList[0].key as string,
  keyword:     ''
};
