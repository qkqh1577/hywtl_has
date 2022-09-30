import {
  EstimateContentId,
  EstimateContentVO
} from 'admin/estimate/content/domain';

export interface EstimateContentParameter
  extends Omit<EstimateContentVO, |'id'> {
  id?: EstimateContentId;
}

export const initialEstimateContentParameter = {
  testType:   [],
  detailList: [''],
  edit:       true,
} as unknown as EstimateContentParameter;
