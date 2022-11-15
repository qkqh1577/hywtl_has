import { ProjectId } from 'project/domain';

export interface ProjectScheduleQuery {
  keyword?: string;
  startDate?: string;
  endDate?: string;
  type?: string;
  projectId?: ProjectId;
}
