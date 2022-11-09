import {
  EstimateTemplateDetailVO,
  EstimateTemplateId,
  EstimateTemplateVO,
} from 'admin/estimate/template/domain';

export interface EstimateTemplateDetailParameter
  extends EstimateTemplateDetailVO {
}

export const initialEstimateTemplateDetailParameter = {
  titleList: [],
} as unknown as EstimateTemplateDetailParameter;

export interface EstimateTemplateParameter
  extends Omit<EstimateTemplateVO, |'id'> {
  id?: EstimateTemplateId;
}

export const initialEstimateTemplateParameter = {
  detailList: [initialEstimateTemplateDetailParameter],
  edit:       true,
} as unknown as EstimateTemplateParameter;

