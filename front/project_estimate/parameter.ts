import { FileItemParameter } from 'file-item';
import { ProjectEstimateType } from 'project_estimate/domain';
import { FormikPartial } from 'type/Form';
import { BusinessId } from 'business/domain';

export interface ProjectCustomEstimateAddParameter {
  isSent: boolean;
  businessId: BusinessId;
  recipient: string;
  note?: string;
  file: FileItemParameter;
  type: ProjectEstimateType;
}

export const initialProjectCustomEstimateAddParameter: FormikPartial<ProjectCustomEstimateAddParameter> = {
  isSent:     false,
  businessId: '',
  recipient:  '',
  note:       '',
  file:       '',
  type:       '',
};