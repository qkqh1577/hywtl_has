import { FileItem } from 'file-item/entity';
import {
  FileItemView,
  isFile
} from 'file-item/view';
import { isEmpty } from 'components/DataFieldProps';

export type FileItemParameter = {
  id?: number;
  requestDelete?: boolean;
  multipartFile?: File;
};

export function toParameter(value: File | FileItem | FileItemView | undefined): FileItemParameter | undefined {
  if (!value || isEmpty(value)) {
    return undefined;
  }
  const id = isFile(value) ? undefined : value.id;
  const multipartFile = isFile(value) ? value : (value as FileItemView).multipartFile;
  return {
    id,
    requestDelete: !!(id && multipartFile),
    multipartFile,
  };
}