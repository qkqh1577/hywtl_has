export type TestServiceTemplateQuery = {
  keywordType?: 'by_title';
  keyword?: string;
  testType: string[];
}

export type TestServiceDetailTemplateParameter = {
  id?: number;
  titleList: string[];
  unit: string;
  unitPrice: number;
  memo?: string;
}

export type TestServiceTemplateParameter = {
  title: string;
  testType: string;
  detailList: TestServiceDetailTemplateParameter[];
}

export type TestServiceTemplateChangeSeqParameter = {
  idList: number[];
}