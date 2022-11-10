import {
  EstimateContentId,
  EstimateContentVO
} from 'admin/estimate/content/domain';
import { TestType } from 'type/TestType';

export interface EstimateContentParameter
  extends Omit<EstimateContentVO, |'id'> {
  id?: EstimateContentId;
}

export const initialEstimateContentParameter = {
  testTypeList: [TestType.COMMON, TestType.REVIEW],
  detailList:   [],
  edit:         true,
} as unknown as EstimateContentParameter;
