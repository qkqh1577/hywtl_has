import {
  initialUser,
  UserVO
} from 'user/domain';

export type ProjectScheduleId = number & { readonly _brand: symbol; }

export function ProjectScheduleId(id: number) {
  return id as ProjectScheduleId;
}

export interface ProjectScheduleVO {
  id?: ProjectScheduleId;
  title: string;
  startTime: Date | undefined;
  endTime: Date | undefined;
  allDay: boolean;
  type: string;
  alertBefore?: number;
  manager: UserVO;
  attendanceList?: UserVO[];
}


export const initialProjectScheduleVO: ProjectScheduleVO = {
  id:             undefined,
  title:          '',
  startTime:      undefined,
  endTime:        undefined,
  allDay:         false,
  type:           '',
  alertBefore:    0,
  manager:        initialUser,
  attendanceList: undefined,
};

export interface ProjectScheduleShort {
  id: ProjectScheduleId;
  title: string;
  startTime: Date | undefined;
  endTime: Date | undefined;
  allDay: boolean;
  type: string;
}




