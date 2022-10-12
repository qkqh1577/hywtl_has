import { UserShortVO } from 'user/domain';
import { FileItemView } from 'file-item';
import { ExpectedDateType } from 'admin/contract/collection/domain';
import { ProjectEstimateVO } from 'project_estimate/domain';

export type ProjectContractId = number & { readonly _brand: symbol }

export function ProjectContractId(id: number) {
  return id as ProjectContractId;
}

export interface ProjectContractVO {
  id: ProjectContractId;
  /** 계약번호: C + 프로젝트코드 + 연번 2자리 */
  estimate: ProjectEstimateVO;
  isSent: boolean;
  recipient: string;
  note?: string;
  pdfFile?: string; // 최종 pdf 파일이 있는 경우만
  basic?: ProjectBasicVO;
  collection?: ProjectContractCollectionVO;
  conditionList?: ProjectContractConditionVO[];
}

export interface ProjectBasicVO {
  serviceName: string; // 용역명
  serviceDuration: string; // 용역 기간
  serviceDurationWeekNumber: string; // 용역 기간 마감 주차
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

export interface ContractCollectionStageWithAmount {
  name?: string;
  ratio?: number;
  note?: string;
  expectedDate?: ExpectedDateType;
  amount?: number,
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
  ratio: number; // 비율
  amount: number; // 금액
  note?: string; // 시기
  expectedDate: Date; // 예정일
}

export interface ProjectContractConditionVO {
  title: string; // 제목
  descriptionList: string[]; // 내용 목록
}
