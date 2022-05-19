export type ServiceItemList = {
  id: number;
  orderNumber: number;
  type: string;
  item: string;
  detailItemCount: number;
  unit: string;
  price: number;
  memo: string;
}

export type ServiceItemOrderList = {
  id: number;
  orderNumber: number;
  type: string;
  item: string;
}

export type ServiceDetailItem = {
  item: string;
  unit: string;
  price: number;
  memo: string;
  orderNumber: number;
  directInputUseYn: boolean;
}

export type ServiceItemDetail = {
  orderNumber: number;
  item: string;
  unit: string;
  price: number;
  memo: string;
  type: string;
  serviceDetailItemViewList?: ServiceDetailItem[];
}