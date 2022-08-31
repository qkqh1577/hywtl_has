import { FormikPartial } from 'type/Form';
import { ProjectId } from 'project/domain';
import { ProjectDocumentType } from 'project/document/domain';

export interface ProjectDocumentParameter {
  projectId: ProjectId;
  recipient: string;
  file: File;
  mailFile?: File;
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
