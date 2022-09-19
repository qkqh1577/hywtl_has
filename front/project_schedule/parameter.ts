import { UserId } from 'user/domain';
import { ProjectScheduleId } from 'project_schedule/domain';

export interface ProjectScheduleParameter {
  id?: ProjectScheduleId;
  startTime: string;
  endTime: string;
  allDay: boolean;
  title: string;
  alertBefore?: number;
  managerId?: UserId;
  attendanceIdList?: UserId[];
}

export const initialProjectScheduleParameter: ProjectScheduleParameter = {
  title: '',
  startTime: '',
  endTime: '',
  alertBefore: 0,
  allDay: false,
  managerId: undefined,
  attendanceIdList: [],
};
