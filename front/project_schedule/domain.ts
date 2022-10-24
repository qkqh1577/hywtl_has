import { UserVO } from 'user/domain';

export type ProjectScheduleId = number & { readonly _brand: symbol; }

export function ProjectScheduleId(id: number) {
  return id as ProjectScheduleId;
}

export interface ProjectScheduleVO {
  id: ProjectScheduleId;
  title: string;
  startTime: Date;
  endTime: Date;
  allDay: boolean;
  type: string;
  alertBefore?: number;
  manager: UserVO;
  attendanceList?: UserVO[];
}

export interface ProjectScheduleShortVO {
  id: ProjectScheduleId;
  title: string;
  startTime: Date | undefined;
  endTime: Date | undefined;
  allDay: boolean;
  type: string;
}




