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

/**
 * 견적 분류
 */
export enum ProjectEstimateExpectation {
  /** 가능성 낮음 */
  LOW     = 'LOW',
  /** 가능성 보통 */
  AVERAGE = 'AVERAGE',
  /** 가능성 높음 */
  HIGH    = 'HIGH',
  /** 계약 직전 */
  NEARLY  = 'NEARLY',
  /** 수주 성공 */
  WIN     = 'WIN',
  /** 수주 실패 */
  LOSE    = 'LOSE'
}

export function projectEstimateExpectationName(status: ProjectEstimateExpectation | '') {
  switch (status) {
    case ProjectEstimateExpectation.LOW:
      return '가능성 낮음';
    case ProjectEstimateExpectation.AVERAGE:
      return '가능성 보통';
    case ProjectEstimateExpectation.HIGH:
      return '가능성 높음';
    case ProjectEstimateExpectation.NEARLY:
      return '계약 직전';
    case ProjectEstimateExpectation.WIN:
      return '수주 성공';
    case ProjectEstimateExpectation.LOSE:
      return '수주 실패';
    default:
      return '-';
  }
}

export const projectEstimateExpectationList: ProjectEstimateExpectation[] = [
  ProjectEstimateExpectation.LOW,
  ProjectEstimateExpectation.AVERAGE,
  ProjectEstimateExpectation.HIGH,
  ProjectEstimateExpectation.NEARLY,
  ProjectEstimateExpectation.WIN,
  ProjectEstimateExpectation.LOSE
];

/**
 * 계약 상태
 */
export enum ProjectEstimateStatus {
  /** 구두 견적 */
  ORAL     = 'ORAL',
  /** 견적 전 */
  BEFORE   = 'BEFORE',
  /** 견적 완료 */
  COMPLETE = 'COMPLETE',
  /** 대비 견적 */
  CONTRAST = 'CONTRAST',
}

export function projectEstimateStatusName(status: ProjectEstimateStatus | '') {
  switch (status) {
    case ProjectEstimateStatus.ORAL:
      return '구두 견적';
    case ProjectEstimateStatus.BEFORE:
      return '견적 전';
    case ProjectEstimateStatus.COMPLETE:
      return '견적 완료';
    case ProjectEstimateStatus.CONTRAST:
      return '대비 견적';
    default:
      return '-';
  }
}

export const projectEstimateStatusList: ProjectEstimateStatus[] = [
  ProjectEstimateStatus.ORAL,
  ProjectEstimateStatus.BEFORE,
  ProjectEstimateStatus.COMPLETE,
  ProjectEstimateStatus.CONTRAST
];

/**
 * 계약 상태
 */
export enum ProjectContractStatus {
  /** 계약 전 */
  BEFORE   = 'BEFORE',
  /** 계약 완료 */
  COMPLETE = 'COMPLETE',
  /** 변경 계약 중 */
  CHANGE   = 'CHANGE'
}

export function projectContractStatusName(status: ProjectContractStatus | '') {
  switch (status) {
    case ProjectContractStatus.BEFORE:
      return '계약 전';
    case ProjectContractStatus.COMPLETE:
      return '계약 완료';
    case ProjectContractStatus.CHANGE:
      return '변경 계약 중';
    default:
      return '-';
  }
}

export const projectContractStatusList: ProjectContractStatus[] = [
  ProjectContractStatus.BEFORE,
  ProjectContractStatus.COMPLETE,
  ProjectContractStatus.CHANGE,
];

export interface ProjectShortVO {
  id: ProjectId;
  code: string;
  name: string;
  status: ProjectProgressStatus;
  alias: string;
}