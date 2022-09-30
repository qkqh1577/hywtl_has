import {
  UserShortVO,
  UserVO
} from 'user/domain';
import { FileItemView } from 'file-item';
import { BusinessVO } from 'business/domain';
import { ExpectedDateType } from 'admin/contract/collection/domain';

export type ProjectContractId = number & { readonly _brand: symbol }

export function ProjectContractId(id: number) {
  return id as ProjectContractId;
}

export interface ProjectContractVO {
  id: ProjectContractId;
  /** 계약번호: C + 프로젝트코드 + 연번 2자리 */
  code: string;
  /** 견적 */
  estimate: ProjectEstimateVO;
  /** 등록자 */
  createdBy: UserVO;
  /** 비고 */
  note?: string;
  /** 수정일시 */
  modifiedAt?: Date;
}

export interface ProjectContractShort {
  id: ProjectContractId;
  /** 계약번호: C + 프로젝트코드 + 연번 2자리 */
  code: string;
  /** 최종 여부 true=Y / false= N */
  confirmed: boolean;
  /** 견적 번호 */
  estimateCode: string;
  /** 날인본 파일 */
  pdfFile?: FileItemView;
  /** 등록자 */
  createdBy: UserShortVO;
  /** 비고 */
  note?: string;
  /** 등록일시 */
  createdAt?: Date;
  /** 수정일시 */
  modifiedAt?: Date;
}

//견적서
export type ProjectEstimateId = number & { readonly  _brand: unique symbol; };

export function ProjectEstimateId(id: number) {
  return id as ProjectEstimateId;
}

export enum ProjectEstimateType {
  CUSTOM         = 'CUSTOM',
  SYSTEM         = 'SYSTEM',
  COMPARISON     = 'COMPARISON',
  SUB_CONTRACTOR = 'SUB_CONTRACTOR',
}

export function projectEstimateTypeName(type: ProjectEstimateType) {
  switch (type) {
    case ProjectEstimateType.CUSTOM:
      return '커스텀';
    case ProjectEstimateType.SYSTEM:
      return '시스템';
    case ProjectEstimateType.COMPARISON:
      return '대비';
    case ProjectEstimateType.SUB_CONTRACTOR:
      return '협력';
    default:
      return '-';
  }
}

export interface ProjectEstimateVO {
  id: ProjectEstimateId;
  code: string;
  type: ProjectEstimateType;
  recipient: string;
  business: BusinessVO;
  confirmed: boolean;
  createdAt: Date;
  createdBy: UserVO;
  isSent: boolean;
  modifiedAt?: Date;
}

export interface ProjectCustomEstimateVO
  extends ProjectEstimateVO {
}

export interface ContractCollectionStageWithAmount {
  name?: string;
  ratio?: number;
  note?: string;
  expectedDate?: ExpectedDateType;
  amount?: number,
}
