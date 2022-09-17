import { UserId } from 'user/domain';

export interface ProjectScheduleParameter {
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
