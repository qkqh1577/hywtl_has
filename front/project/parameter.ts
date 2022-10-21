import { UserId } from 'user/domain';
import {
  ProjectBasicBidType,
  ProjectProgressStatus,
  ProjectStatus
} from 'project/domain';
import { pageSizeList } from 'type/Page';

export interface ProjectAddParameter {
  name: string;
  alias: string;
  receptionManagerId: UserId;
  progressStatus: ProjectProgressStatus;
  bidType: ProjectBasicBidType;
  memo?: string;
}

export interface ProjectStatusParameter
  extends ProjectStatus {
}

export interface ProjectQuery {
  keyword: string;
  page: number;
  size: number;
}

export const initialProjectQuery: ProjectQuery = {
  keyword: '',
  page:    0,
  size:    pageSizeList[0]
};