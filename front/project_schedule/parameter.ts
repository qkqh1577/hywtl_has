import { ProjectScheduleVO } from 'project_schedule/domain';

export interface ProjectScheduleParameter
  extends Omit<ProjectScheduleVO, 'type'> {}
