export type ProjectId = number & { readonly _brand: unique symbol; }

export function ProjectId(id: number) {
  return id as ProjectId;
}

/**
 * 프로젝트 진행 현황
 */
export enum ProjectProgressStatus {
  /** 가등록 */
  TEMPORARY        = 'TEMPORARY',
  /** 등록 */
  UNDER_CONTRACT   = 'UNDER_CONTRACT',
  /** 용역 개시 전 */
  BEFORE_SERVICE   = 'BEFORE_SERVICE',
  /** 용역 진행 중 */
  SERVICE_ON_GOING = 'SERVICE_ON_GOING',
  /** 용역 완료 */
  SERVICE_COMPLETE = 'SERVICE_COMPLETE',
  /** 용역 홀딩 */
  SERVICE_HOLDING  = 'SERVICE_HOLDING',
}

export function projectProgressStatusName(status: ProjectProgressStatus | '') {
  switch (status) {
    case ProjectProgressStatus.TEMPORARY:
      return '가등록';
    case ProjectProgressStatus.UNDER_CONTRACT:
      return '등록';
    case ProjectProgressStatus.BEFORE_SERVICE:
      return '용역개시전';
    case ProjectProgressStatus.SERVICE_ON_GOING:
      return '용역진행중';
    case ProjectProgressStatus.SERVICE_COMPLETE:
      return '용역완료';
    case ProjectProgressStatus.SERVICE_HOLDING:
      return '용역홀딩';
    default:
      return '-';
  }
}

export const projectProgressStatusList: ProjectProgressStatus[] = [
  ProjectProgressStatus.TEMPORARY,
  ProjectProgressStatus.UNDER_CONTRACT,
  ProjectProgressStatus.BEFORE_SERVICE,
  ProjectProgressStatus.SERVICE_ON_GOING,
  ProjectProgressStatus.SERVICE_COMPLETE,
  ProjectProgressStatus.SERVICE_HOLDING
];

export interface ProjectShortVO {
  id: ProjectId;
  code: string;
  name: string;
  status: ProjectProgressStatus;
  alias: string;
}