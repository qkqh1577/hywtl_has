export type TestServiceDetailTemplateView = {
  id: number | '';
  titleList: string[];
  unit: string;
  unitPrice: number | '';
  memo: string;
}

export type TestServiceTemplateView = {
  title: string;
  testType: string;
  totalPrice: number | '';
  detailList: TestServiceDetailTemplateView[];
}

export const initTestServiceDetailTemplateView: TestServiceDetailTemplateView = {
  id: '',
  titleList: [''],
  unit: '',
  unitPrice: '',
  memo: '',
};

export const initTestServiceTemplateView: TestServiceTemplateView = {
  title: '',
  testType: '',
  totalPrice: '',
  detailList: [initTestServiceDetailTemplateView],
};