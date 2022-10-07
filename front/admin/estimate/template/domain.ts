import {
  TestType,
  TestUnit
} from 'type/TestType';

export type EstimateTemplateId = number & { readonly _brand: unique symbol; }

export function EstimateTemplateId(id: number) {
  return id as EstimateTemplateId;
}

export interface EstimateTemplateDetailVO {
  titleList: string[];
  unit: TestUnit;
  unitAmount: number;
  inUse: boolean;
  note?: string;
}

export interface EstimateTemplateVO {
  id: EstimateTemplateId;
  title: string;
  testType: TestType;
  detailList: EstimateTemplateDetailVO[];
}

export interface EstimateTemplateShort
  extends Omit<EstimateTemplateVO, |'detailList'> {
  detailCount: number;
}