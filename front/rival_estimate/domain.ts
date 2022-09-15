import { BusinessVO } from 'business/domain';

export type RivalEstimateId = number & { readonly _brand: unique symbol; };

export function RivalEstimateId(id: number) {
  return id as RivalEstimateId;
}

export interface RivalEstimateVO {
  id: RivalEstimateId;
  business?: BusinessVO;
  testAmount?: number;
  reviewAmount?: number;
  totalAmount?: number;
  expectedDuration?: string;
  modifiedAt: Date;
}