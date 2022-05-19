export type ServiceItemQuery = {
  type?: string[];
  item?: string;
}

type ServiceDetailItemParameter = {
  directInputUseYn: boolean;
  item: string;
  unit: string;
  price: number;
  memo: string;
  orderNumber: number;
}

export type ServiceItemParameter = {
  orderNumber: number;
  item: string;
  unit: string;
  price: number;
  memo: string;
  type: string;
  serviceDetailItemParameterList: ServiceDetailItemParameter[];
}