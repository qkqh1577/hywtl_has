import { FileItemParameter } from 'file-item';
import {
  ProjectEstimateId,
  ProjectEstimateType
} from 'project_estimate/domain';
import { BusinessId } from 'business/domain';

export interface ProjectCustomEstimateAddParameter {
  isSent: boolean;
  businessId: BusinessId;
  recipient: string;
  note?: string;
  file: FileItemParameter;
  type: ProjectEstimateType;
}

export interface ProjectCustomEstimateChangeParameter {
  id: ProjectEstimateId;
  isSent: boolean;
  businessId: BusinessId;
  recipient: string;
  note?: string;
}

export interface ProjectSystemEstimateParameter {
  id?: ProjectEstimateId;
  isSent: boolean;
  recipient: string;
  note?: string;
  plan: ProjectEstimatePlanParameter;

}

export interface ProjectEstimatePlanParameter {
  estimateDate: Date;
  expectedServiceDate: Date;
  expectedTestDeadline: number;
  expectedFinalReportDeadline: number;
}