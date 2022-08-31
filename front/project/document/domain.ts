import {
  UserVO
} from 'user/domain';
import { FileItem } from 'file-item';
import {
  FormikEditable,
  FormikPartial
} from 'type/Form';

export type DocumentId = number & { readonly _brand: symbol }

export function DocumentId(id: number) {
  return id as DocumentId;
}

export interface DocumentVO {
  id: DocumentId;
  code: string; // 자료ID
  createdBy: UserVO; // 등록자
  recipient: string; // 수신처
  file: FileItem; // 파일
  mailFile?: FileItem; // 메일 파일
  note?: string; // 비고
}

export interface DocumentShort
  extends DocumentVO {
  type: DocumentType;
  mailFileId?: number;
  createdAt: Date; // 등록 일시
  modifiedAt?: Date; // 수정 일시
}

export const initialDocumentVO: FormikPartial<DocumentVO> = {
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
export enum DocumentType {

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

export function documentTypeName(type: DocumentType) {
  switch (type) {
    case DocumentType.RECEIVED:
      return '받은 자료';
    case DocumentType.SENT:
      return '보낸 자료';
    case DocumentType.BUILDING:
      return '형상비 검토 자료';
    default:
      return '-';
  }
}

export const documentTypeList: DocumentType[] = [
  DocumentType.RECEIVED,
  DocumentType.SENT,
  DocumentType.BUILDING
];
