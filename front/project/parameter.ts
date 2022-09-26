import {
  ProjectBasicBidType,
  ProjectProgressStatus,
  ProjectStatus
} from 'project/domain';
import { UserId } from 'user/domain';

export interface ProjectAddParameter {
  name: string;
  alias: string;
  receptionManagerId: UserId;
  progressStatus: ProjectProgressStatus;
  bidType: ProjectBasicBidType;
  memo?: string;
}

export interface ProjectStatusParameter
  extends Partial<ProjectStatus> {
}