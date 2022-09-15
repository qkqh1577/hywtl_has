import { FileItemParameter } from 'file-item';
import { ProjectEstimateType } from 'project_estimate/domain';
import { BusinessId } from 'business/domain';

export interface ProjectCustomEstimateAddParameter {
  isSent: boolean;
  businessId: BusinessId;
  recipient: string;
  note?: string;
  file: FileItemParameter;
  type: ProjectEstimateType;
}
