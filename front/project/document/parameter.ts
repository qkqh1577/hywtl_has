import { FormikPartial } from 'type/Form';
import { ProjectId } from 'project/domain';
import {
  ProjectDocumentId,
  ProjectDocumentType
} from 'project/document/domain';
import {
  FileItemParameter,
} from 'file-item';

export interface ProjectDocumentParameter {
  projectId: ProjectId;
  recipient: string;
  file: FileItemParameter;
  mailFile?: FileItemParameter;
  note: string;
  type: ProjectDocumentType;
}

export const initialProjectDocumentParameter: FormikPartial<ProjectDocumentParameter> = {
  projectId: '',
  recipient: '',
  file:      '',
  mailFile:  '',
  note:      '',
  type:      ''
};

export interface ProjectDocumentUpdateParameter {
  id: ProjectDocumentId;
  recipient: string;
  mailFile?: FileItemParameter;
  note?: string;
}