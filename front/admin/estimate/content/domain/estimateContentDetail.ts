/* 견적서 내용 상세 */
export type EstimateContentDetailId = number & { readonly _brand: unique symbol; };

export function EstimateContentDetailId(id: number) {
  return id as EstimateContentDetailId;
}

export interface EstimateContentDetailVO {
  id?: EstimateContentDetailId | '';
  description: string;
}

export const initialEstimateContentDetail: EstimateContentDetailVO = {
  id: '',
  description: '',
}
