import { UserShortVO } from 'user/domain';
import { FileItemView } from 'file-item';
import { ProjectEstimateVO } from 'project_estimate/domain';
import { BusinessShortVO } from 'business/domain';

export type ProjectContractId = number & { readonly _brand: symbol }

export function ProjectContractId(id: number) {
  return id as ProjectContractId;
}
export enum ProjectContractType {
  /**
   * 본 계약
   */
  ORIGIN = 'ORIGIN',
  /**
   * 변경 계약
   */
  CHANGE = 'CHANGE',
  /**
   * 추가 계약
   */
  ADDITION = 'ADDITION',
  /**
   * 승계 계약
   */
  KEEP = 'KEEP',
}

export const projectContractTypeList = [
  ProjectContractType.ORIGIN,
  ProjectContractType.CHANGE,
  ProjectContractType.ADDITION,
  ProjectContractType.KEEP,
];

export function projectContractTypeName(type: ProjectContractType) {
  switch (type) {
    case ProjectContractType.ORIGIN:
      return '본 계약';
    case ProjectContractType.CHANGE:
      return '변경 계약';
    case ProjectContractType.ADDITION:
      return '추가 계약';
    case ProjectContractType.KEEP:
      return '승계 계약';
  }
}

export interface ProjectContractShortVO {
  id: ProjectContractId;
  contractType: ProjectContractType;
  code: string;
  isSent: boolean;
  confirmed: boolean;
  estimateCode: string;
  pdfFile?: FileItemView;
  note?: string;
  createdBy: UserShortVO;
  createdAt: Date;
  modifiedAt?: Date;
  contractDate?: Date;
  targetTest: string;
  testAmount: number;
  reviewAmount: number;
  totalAmount: number;
  collection: ProjectContractCollectionVO;
  orderer: string;
  collectionRate: string;
  schedule: string;
  fileType?: string;
}

export interface ProjectFinalContractVO
  extends ProjectContractShortVO {
  business: BusinessShortVO;
}

export interface ProjectContractVO
  extends Omit<ProjectContractShortVO,
    | 'estimateCode'
    | 'contractDate'
    | 'createdAt'
    | 'modifiedAt'
    | 'createdBy'> {
  estimate: ProjectEstimateVO;
  recipient: string;
  basic: ProjectContractBasicVO;
  collection: ProjectContractCollectionVO;
  conditionList: ProjectContractConditionVO[];
}

export interface ProjectContractBasicVO {
  serviceName: string; // 용역명
  serviceDuration: string; // 용역 기간
  outcome: string; // 성과품
  description?: string; // 추가 사항
  contractDate: Date; // 계약 날짜
  ordererAddress: string; // 발주자 소재
  ordererCompanyName: string; // 발주자 상호
  ordererCeoName: string; // 발주자 대표명
  contractorAddress: string; // 수급자 소재
  contractorCompanyName: string; // 수급자 상호
  contractorCeoName: string; // 수급자 대표명
}

export interface ProjectContractCollectionVO {
  stageNote: string; // 기성 단계 비고
  stageList: ProjectContractCollectionStage[];
  totalAmountNote?: string; // 총액에 대한 설명
  totalAmount: number; // 총액
}

export interface ProjectContractCollectionStage {
  name: string; // 단계명
  rate: number; // 비율
  amount: number; // 금액
  note?: string; // 시기
  expectedDate: Date; // 예정일
}

export interface ProjectContractConditionVO {
  title: string; // 제목
  descriptionList: string[]; // 내용 목록
}
