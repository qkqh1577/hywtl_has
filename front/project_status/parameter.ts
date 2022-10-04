import { ProjectStatus } from 'project_status/domain';

export interface ProjectStatusParameter
  extends Partial<ProjectStatus> {
}
