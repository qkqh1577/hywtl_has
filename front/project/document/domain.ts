import {
  UserVO
} from 'user/domain';
import {
  FormikPartial
} from 'type/Form';
import { FileItemView } from 'file-item';

export type ProjectDocumentId = number & { readonly _brand: symbol }

export function ProjectDocumentId(id: number) {
  return id as ProjectDocumentId;
}

export interface ProjectDocumentVO {
  id: ProjectDocumentId;
  code: string; // 자료ID
  createdBy: UserVO; // 등록자
  recipient: string; // 수신처
  file: FileItemView; // 파일
  mailFile?: FileItemView; // 메일 파일
  note?: string; // 비고
}

export interface ProjectDocumentShort
  extends ProjectDocumentVO {
  type: ProjectDocumentType;
  mailFileId?: number;
  createdAt: Date; // 등록 일시
  modifiedAt?: Date; // 수정 일시
}

export const initialProjectDocumentVO: FormikPartial<ProjectDocumentVO> = {
  id:        '',
  code:      '',
  createdBy: '',
  recipient: '',
  file:      '',
  mailFile:  '',
  note:      '',
};

/**
 * 자료 타입
 */
export enum ProjectDocumentType {

  /**
   * 받은 자료
   */
  RECEIVED = 'RECEIVED',

  /**
   * 보낸 자료
   */
  SENT     = 'SENT',

  /**
   * 형상비 검토 자료
   */
  BUILDING = 'BUILDING',
}

export function projectDocumentTypeName(type: ProjectDocumentType) {
  switch (type) {
    case ProjectDocumentType.RECEIVED:
      return '받은 자료';
    case ProjectDocumentType.SENT:
      return '보낸 자료';
    case ProjectDocumentType.BUILDING:
      return '형상비 검토 자료';
    default:
      return '-';
  }
}

/**
 * 메일파일 버튼 유형과 파일 버튼 유형
 */
export enum ButtonType {
  /**
   * 파일 버튼
   */
  FILE_BUTTON      = 'FILE_BUTTON',

  /**
   * 메일 파일 버튼
   */
  MAIL_FILE_BUTTON = 'MAIL_FILE_BUTTON'

}