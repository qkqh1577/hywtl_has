import { UserId } from 'user/domain';
import {
  ProjectBasicBidType,
  ProjectProgressStatus
} from 'project_status/domain';

export interface ProjectAddParameter {
  name: string;
  alias: string;
  receptionManagerId: UserId;
  progressStatus: ProjectProgressStatus;
  bidType: ProjectBasicBidType;
  memo?: string;
}
