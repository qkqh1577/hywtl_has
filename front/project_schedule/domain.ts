import {
  initialUser,
  UserVO
} from 'user/domain';

export type ProjectScheduleId = number & { readonly _brand: symbol; }

export function ProjectScheduleId(id: number) {
  return id as ProjectScheduleId;
}

export interface ProjectScheduleVO {
  id: ProjectScheduleId;
  startTime: Date | undefined;
  endTime: Date | undefined;
  allDay: boolean;
  title: string;
  type: string;
  alertBefore?: number;
  manager: UserVO;
  attendanceList?: UserVO[];
}

export interface ProjectScheduleVOForAdd {
  startTime: Date | undefined;
  endTime: Date | undefined;
  allDay: boolean;
  title: string;
  type?: string;
  alertBefore?: number;
  manager: UserVO;
  attendanceList?: UserVO[];
}

export const initialProjectScheduleVO: ProjectScheduleVOForAdd = {
  alertBefore:    0,
  allDay:         false,
  attendanceList: [],
  endTime:        undefined,
  manager:        initialUser,
  startTime:      undefined,
  title:          '',
  type:           ''
};

export interface ProjectScheduleShort
  extends Omit<ProjectScheduleVO,
    'alertBefore' |
    'manager' |
    'attendanceList'> {
}




