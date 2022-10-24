import { TestType } from 'type/TestType';

export type EstimateContentId = number & { readonly _brand: unique symbol; }

export function EstimateContentId(id: number) {
  return id as EstimateContentId;
}

export interface EstimateContentVO {
  id: EstimateContentId;
  name: string;
  testTypeList: TestType[];
  detailList: string[];
}

export interface EstimateContentShortVO
  extends EstimateContentVO {
  detailCount: number;
}

export interface EstimateContentVariableVO {
  name: string;
  note: string;
}
