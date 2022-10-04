import { ProjectDocumentId, } from 'project_document/domain';
import { FileItemParameter, } from 'file-item';

export interface ProjectDocumentParameter {
  recipient: string;
  file: FileItemParameter;
  mailFile?: FileItemParameter;
  note?: string;
}

export const initialProjectDocumentParameter = {} as ProjectDocumentParameter;

export interface ProjectDocumentChangeParameter {
  id: ProjectDocumentId;
  recipient: string;
  mailFile?: FileItemParameter;
  note?: string;
}

export const initialProjectDocumentChangeParameter = {} as ProjectDocumentChangeParameter;