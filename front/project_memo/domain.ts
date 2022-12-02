import {
  UserId,
  UserVO
} from 'user/domain';

export type ProjectMemoId = number & { readonly _brand: unique symbol; };

export function ProjectMemoId(id: number) {
  return id as ProjectMemoId;
}

/**
 * 프로젝트 메모 카테고리
 */
export enum ProjectMemoCategory {
  /** 기본 정보 */
  BASIC             = 'BASIC',
  BUILDING          = 'COMPLEX',
  ESTIMATE_CONTRACT = 'ESTIMATE_CONTRACT',
  PROGRESS          = 'PROGRESS',
  DOCUMENT          = 'DOCUMENT',
  SCHEDULE          = 'SCHEDULE',
  LOG               = 'LOG',
}

export function projectMemoCategoryName(category: ProjectMemoCategory | '') {
  switch (category) {
    case ProjectMemoCategory.BASIC:
      return '기본 정보';
    case ProjectMemoCategory.BUILDING:
      return '단지 정보';
    case ProjectMemoCategory.ESTIMATE_CONTRACT:
      return '견적/계약';
    case ProjectMemoCategory.PROGRESS:
      return '진행 정보';
    case ProjectMemoCategory.DOCUMENT:
      return '자료';
    case ProjectMemoCategory.SCHEDULE:
      return '일정';
    case ProjectMemoCategory.LOG:
      return '이력';
    default:
      return '-';
  }
}

export const projectMemoCategoryList: ProjectMemoCategory[] = [
  ProjectMemoCategory.BASIC,
  ProjectMemoCategory.BUILDING,
  ProjectMemoCategory.ESTIMATE_CONTRACT,
  ProjectMemoCategory.PROGRESS,
  ProjectMemoCategory.DOCUMENT,
  ProjectMemoCategory.SCHEDULE,
  ProjectMemoCategory.LOG
];

export interface ProjectMemoVO {
  id: ProjectMemoId;
  category: ProjectMemoCategory;
  description: string;
  writer: UserVO;
  createdAt: Date;
  modifiedAt?: Date;
  attendanceList?: UserId[];
  isOpenedAttendanceList: boolean;
}
