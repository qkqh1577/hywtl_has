import { UserVO } from 'user/domain';

export type ProjectScheduleId = number & { readonly _brand: symbol; }

export function ProjectScheduleId(id: number) {
  return id as ProjectScheduleId;
}

export interface ProjectScheduleVO {
  id: ProjectScheduleId;
  startTime: Date;
  endTime: Date;
  allDay: boolean;
  title: string;
  type: string;
  alertBefore?: number;
  manager: UserVO;
  attendanceList?: UserVO[];
}

export interface ProjectScheduleShort
  extends Omit<ProjectScheduleVO,
    'alertBefore' |
    'manager' |
    'attendanceList'> {
}




