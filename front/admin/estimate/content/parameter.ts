import { EstimateContentVO } from 'admin/estimate/content/domain';
import { FormikPartial } from 'type/Form';

export interface EstimateContentParameter
  extends EstimateContentVO {
}

export const initialEstimateContentParameter: FormikPartial<EstimateContentParameter> = {
  id:         '',
  name:       '',
  testTypeList:   '',
  detailList: [],
};
