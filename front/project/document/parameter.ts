import {
  DocumentType,
} from 'project/document/domain';
import { FormikPartial } from 'type/Form';
import { FileItem } from 'file-item';
import { ProjectId } from 'project/domain';

export interface ProjectDocumentParameter {
  recipient: string,
  file: File;
  mailFile?: File;
  note: string;
}

export const initialProjectDocumentParameter: FormikPartial<ProjectDocumentParameter> = {
  recipient: '',
  file:      '',
  mailFile:  '',
  note:      '',
};
