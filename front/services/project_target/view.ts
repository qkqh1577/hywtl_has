import { FileItemView } from 'services/common/file-item';

export type ProjectTargetDocumentView = {
  fileItem: FileItemView | null;
  memo: string;
}

export const initProjectTargetDocument: ProjectTargetDocumentView = {
  fileItem: null,
  memo: '',
};
