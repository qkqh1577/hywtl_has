import { DocumentType } from 'project/document/domain';

export interface documentAddParameter {
  recipient: string;
  file: File;
  maileFile?: File;
  note?: string;
  type: DocumentType;
}
