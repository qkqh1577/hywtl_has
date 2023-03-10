import { UserVO } from 'user/domain';

export type ProjectId = number & { readonly _brand: unique symbol; }

export function ProjectId(id: number) {
  return id as ProjectId;
}

export interface ProjectVO
  extends ProjectStatus {
  id: ProjectId;
  code?: string;
  name: string;
  alias: string;
  bidType: ProjectBasicBidType;
  receptionManager: UserVO;
  salesManager?: UserVO;
  projectManager?: UserVO;
  expectedMonth?: Date;
  requestedMonth?: Date;
  isLh?: boolean;
  modifiedAt?: Date;
  isFavorite?: boolean;
}

export interface ProjectShortVO {
  id: ProjectId;
  code?: string;
  name: string;
  progressStatus: ProjectProgressStatus;
  alias: string;
  isFavorite: boolean;
}

/**
 * 프로젝트 진행 현황
 */
export enum ProjectProgressStatus {
  /** 가등록 */
  TEMPORARY        = 'TEMPORARY',
  /** 등록 */
  UNDER_CONTRACT   = 'UNDER_CONTRACT',
  /** 업무 개시 전 */
  BEFORE_SERVICE   = 'BEFORE_SERVICE',
  /** 업무 진행 중 */
  SERVICE_ON_GOING = 'SERVICE_ON_GOING',
  /** 업무 완료 */
  SERVICE_COMPLETE = 'SERVICE_COMPLETE',
  /** 업무 홀딩 */
  SERVICE_HOLDING  = 'SERVICE_HOLDING',
}

export function projectProgressStatusName(status: ProjectProgressStatus | '') {
  switch (status) {
    case ProjectProgressStatus.TEMPORARY:
      return '가등록';
    case ProjectProgressStatus.UNDER_CONTRACT:
      return '등록';
    case ProjectProgressStatus.BEFORE_SERVICE:
      return '업무개시전';
    case ProjectProgressStatus.SERVICE_ON_GOING:
      return '업무진행중';
    case ProjectProgressStatus.SERVICE_COMPLETE:
      return '업무완료';
    case ProjectProgressStatus.SERVICE_HOLDING:
      return '업무홀딩';
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
 * 견적 구분
 */
export enum ProjectBasicBidType {
  /** 일반 */
  DEFAULT = 'DEFAULT',
  /** 나라장터 입찰 */
  G2B     = 'G2B',
  /** 기업 입찰 */
  COMPANY = 'COMPANY'
}

export function projectBasicBidTypeName(type: ProjectBasicBidType | '') {
  switch (type) {
    case ProjectBasicBidType.DEFAULT:
      return '일반';
    case ProjectBasicBidType.G2B:
      return '나라장터 입찰';
    case ProjectBasicBidType.COMPANY:
      return '기업 입찰';
    default:
      return '-';
  }
}

export const projectBasicBidTypeList: ProjectBasicBidType[] = [
  ProjectBasicBidType.DEFAULT,
  ProjectBasicBidType.G2B,
  ProjectBasicBidType.COMPANY
];

/**
 * 견적 분류
 */
export enum ProjectEstimateExpectation {
  /** 구조물 */
  STRUCTURE     = 'STRUCTURE',
  /** 일반 */
  NORMAL = 'NORMAL',
  /** 가능성 높음 */
  HIGH    = 'HIGH',
  /** 수주 직전 */
  NEARLY  = 'NEARLY',
  /** 수주 성공 */
  WIN     = 'WIN',
  /** 수주 실패 */
  LOSE    = 'LOSE'
}

export function projectEstimateExpectationName(status: ProjectEstimateExpectation) {
  switch (status) {
    case ProjectEstimateExpectation.STRUCTURE:
      return '구조물';
    case ProjectEstimateExpectation.NORMAL:
      return '일반';
    case ProjectEstimateExpectation.HIGH:
      return '가능성 높음';
    case ProjectEstimateExpectation.NEARLY:
      return '수주 직전';
    case ProjectEstimateExpectation.WIN:
      return '수주 성공';
    case ProjectEstimateExpectation.LOSE:
      return '수주 실패';
    default:
      return '-';
  }
}

export const projectEstimateExpectationList: ProjectEstimateExpectation[] = [
  ProjectEstimateExpectation.STRUCTURE,
  ProjectEstimateExpectation.NORMAL,
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
  COMPARE  = 'COMPARE',
}

export function projectEstimateStatusName(status: ProjectEstimateStatus | '') {
  switch (status) {
    case ProjectEstimateStatus.ORAL:
      return '구두 견적';
    case ProjectEstimateStatus.BEFORE:
      return '견적 전';
    case ProjectEstimateStatus.COMPLETE:
      return '견적 완료';
    case ProjectEstimateStatus.COMPARE:
      return '대비 견적';
    default:
      return '-';
  }
}

export const projectEstimateStatusList: ProjectEstimateStatus[] = [
  ProjectEstimateStatus.ORAL,
  ProjectEstimateStatus.BEFORE,
  ProjectEstimateStatus.COMPLETE,
  ProjectEstimateStatus.COMPARE
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


/**
 * 입찰 상태
 */
export enum ProjectBidStatus {
  /**
   * 대기
   */
  WAITING  = 'WAITING',
  /**
   * 입찰
   */
  BID      = 'BID',
  /**
   * 미입찰
   */
  HOLD     = 'HOLD',
  /**
   * 낙찰 성공
   */
  WIN      = 'WIN',
  /**
   * 낙찰 실패
   */
  LOSE     = 'LOSE',
  /**
   * 대비 입찰
   */
  CONTRAST = 'CONTRAST',
}

export function projectBidStatusName(status: ProjectBidStatus) {
  switch (status) {
    case ProjectBidStatus.WAITING:
      return '대기';
    case ProjectBidStatus.BID:
      return '입찰';
    case ProjectBidStatus.HOLD:
      return '미입찰';
    case ProjectBidStatus.WIN:
      return '낙찰 성공';
    case ProjectBidStatus.LOSE:
      return '낙찰 실패';
    case ProjectBidStatus.CONTRAST:
      return '대비 입찰';
    default:
      return '-';
  }
}

export const projectBidStatusList: ProjectBidStatus[] = [
  ProjectBidStatus.WAITING,
  ProjectBidStatus.BID,
  ProjectBidStatus.HOLD,
  ProjectBidStatus.WIN,
  ProjectBidStatus.LOSE,
  ProjectBidStatus.CONTRAST
];

export interface ProjectStatus {
  progressStatus?: ProjectProgressStatus;
  estimateExpectation?: ProjectEstimateExpectation;
  bidStatus?: ProjectBidStatus;
  estimateStatus?: ProjectEstimateStatus;
  contractStatus?: ProjectContractStatus;
}
