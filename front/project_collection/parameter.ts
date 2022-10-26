import {
  ProjectCollectionStageId,
  ProjectCollectionStageStatusType
} from 'project_collection/domain';

export interface ProjectCollectionAddStageParameter {
  name: string;
  note?: string;
  rate: number;
  amount: number;
  expectedDate: Date;
}

export interface ProjectCollectionStageStatusParameter {
  type: ProjectCollectionStageStatusType;
  requestedDate: string;
  amount?: number;
  note?: string;
}

export interface ProjectCollectionChangeStageParameter
  extends ProjectCollectionAddStageParameter {
  id: ProjectCollectionStageId;
  reason: string;
  statusList?: ProjectCollectionStageStatusParameter[];
}

export const initialProjectCollectionChangeStageParameter = {
  statusList: [],
  edit:       false
} as unknown as ProjectCollectionChangeStageParameter;