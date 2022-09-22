import {
  UserShortVO,
  UserVO
} from 'user/domain';
import {
  FormikPartial
} from 'type/Form';
import { FileItemView } from 'file-item';

export type ProjectContractId = number & { readonly _brand: symbol }

export function ProjectContractId(id: number) {
  return id as ProjectContractId;
}

export interface ProjectContractVO {
  id: ProjectContractId;
  /** 계약번호: C + 프로젝트코드 + 연번 2자리 */
  code: string;
}

export interface ProjectContractShort extends ProjectContractVO {
  /** 최종 여부 true=Y / false= N */
  confirmed: boolean;
  /** 견적 번호 */
  estimateCode: string;
  /** 날인본 파일 */
  pdfFile?: FileItemView;
  /** 등록자 */
  createdBy: UserShortVO;
  /** 비고 */
  note?: string; // 비고
  createdAt?: Date;
  modifiedAt?: Date;
}

export const initialProjectContractVO: FormikPartial<ProjectContractVO> = {
  id:        '',
  code:      ''
};