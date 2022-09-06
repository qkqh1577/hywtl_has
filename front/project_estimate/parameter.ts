import { FileItemParameter } from 'file-item';
import { ProjectEstimateType } from 'project_estimate/domain';

export interface ProjectCustomEstimateAddParameter {
  isSent: boolean;
  business: string;
  note?: string;
  file: FileItemParameter;
  type: ProjectEstimateType;
}