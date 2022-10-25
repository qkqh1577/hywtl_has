import { ProjectCollectionStageId } from 'project_collection/domain';

export interface ProjectCollectionAddStageParameter {
  name: string;
  note?: string;
  rate: number;
  amount: number;
  expectedDate: Date;
}

export interface ProjectCollectionChangeStageParameter
  extends ProjectCollectionAddStageParameter {
  id: ProjectCollectionStageId;
  reason: string;
}
