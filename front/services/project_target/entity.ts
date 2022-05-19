import { FileItem } from 'services/common/file-item';
import { ListUser } from 'services/user';

export type ProjectTargetDocument = {
  id: number;
  fileItem: FileItem;
  writer: ListUser;
  memo?: string;
  createdAt: Date;
  modifiedAt?: Date;
}
