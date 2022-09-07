import { FileItemParameter } from 'file-item';
import { ProjectEstimateType } from 'project_estimate/domain';
import { FormikPartial } from 'type/Form';

export interface ProjectCustomEstimateAddParameter {
  isSent: boolean;
  business: string;
  note?: string;
  file: FileItemParameter;
  type: ProjectEstimateType;
  isSentSelect: 'Y' | 'N';
}

export const initialProjectCustomEstimateAddParameter: FormikPartial<ProjectCustomEstimateAddParameter> = {
  isSent:       false,
  isSentSelect: 'N',
  business:     '',
  note:         '',
  file:         '',
  type:         '',
};