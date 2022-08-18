import { ProjectStatus } from 'project/domain';

export interface ProjectStatusParameter
  extends Partial<ProjectStatus> {
}