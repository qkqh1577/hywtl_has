import {
  DocumentType,
} from 'project/document/domain';
import { FormikPartial } from 'type/Form';
import { FileItem } from 'file-item';

export interface ProjectDocumentParameter {
  recipient: string,
  file:      FileItem,
  mailFile?:  FileItem,
  note:      string,
  type:      DocumentType
}

export const initialProjectDocumentParameter: FormikPartial<ProjectDocumentParameter> = {
  recipient: '',
  file:      '',
  mailFile:  '',
  note:      '',
  type:      ''
}
