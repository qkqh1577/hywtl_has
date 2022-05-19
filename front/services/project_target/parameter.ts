import { FileItemParameter } from 'services/common/file-item';

export type ProjectTargetDocumentAddParameter = {
  fileItem: FileItemParameter;
  memo?: string;
}

export type ProjectTargetDocumentChangeParameter = {
  memo?: string;
}
