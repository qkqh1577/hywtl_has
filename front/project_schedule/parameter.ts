import { ProjectScheduleVO } from 'project_schedule/domain';
import { initialUser } from 'user/domain';

export interface ProjectScheduleParameter
  extends Omit<ProjectScheduleVO, 'type' | 'id'> {
}

export const initialProjectScheduleParameter: ProjectScheduleParameter = {
  startTime: undefined,
  endTime:   undefined,
  allDay:    false,
  manager:   initialUser,
  title:     '',
};
