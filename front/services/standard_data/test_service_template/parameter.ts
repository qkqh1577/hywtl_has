import { testTypeList } from 'services/standard_data/test_service_template/data';

export interface TestServiceTemplateQuery {
  keywordType?: 'by_title';
  keyword?: string;
  testType: string[];
}

export const initQuery: TestServiceTemplateQuery = {
  testType: testTypeList,
};

export interface TestServiceDetailTemplateParameter {
  id?: number;
  titleList: string[];
  unit: string;
  unitPrice: number;
  memo?: string;
}

export interface TestServiceTemplateParameter {
  title: string;
  testType: string;
  detailList: TestServiceDetailTemplateParameter[];
}

export interface TestServiceTemplateChangeSeqParameter {
  idList: number[];
}
