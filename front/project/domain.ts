import {
  ProjectProgressStatus,
  ProjectStatus
} from 'project_status/domain';
import { ProjectBasic } from 'project_basic/domain';
import { TestType } from 'type/TestType';

export type ProjectId = number & { readonly _brand: unique symbol; }

export function ProjectId(id: number) {
  return id as ProjectId;
}

export interface ProjectVO
  extends ProjectBasic,
          ProjectStatus {
}

export interface ProjectShortVO {
  id: ProjectId;
  code?: string;
  name: string;
  progressStatus: ProjectProgressStatus;
  alias: string;
}

export interface ProjectSummary {
  testType?: TestType[];
  progress: number;
  amount: number;
}
