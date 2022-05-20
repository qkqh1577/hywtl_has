export type TestServiceDetailTemplate = {
  id: number;
  titleList: string[];
  unit: string;
  unitPrice: number;
  memo?: string;
}

export type ListTestServiceTemplate = {
  id: number;
  testType: string;
  title: string;
  detailCount: number;
  totalPrice: number;
}

export type TestServiceTemplate = {
  id: number;
  title: string;
  testType: string;
  detailList: TestServiceDetailTemplate[];
}
