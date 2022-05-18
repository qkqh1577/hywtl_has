export type ServiceItemList = {
  id: number;
  order: number;
  type: string;
  item: string;
  detailItemCount: number;
  unit: string;
  price: number;
  memo: string;
}

export type ServiceDetailItem = {
  item: string;
  unit: string;
  price: number;
  memo: string;
  directInputUseYn: boolean;
}

export type ServiceItemDetail = {
  item: string;
  unit: string;
  price: number;
  memo: string;
  type: string;
  serviceDetailItemViewList?: ServiceDetailItem[];
}