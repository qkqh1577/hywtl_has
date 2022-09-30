import { FileItem, } from 'file-item/index';
import {
  equals as objectEquals,
  isEmpty
} from 'components/DataFieldProps';

export type FileItemView = {
  id?: number;
  filename: string;
  ext: string;
  size: number;
  readableSize: string;
  multipartFile?: File;
  requestDelete?: boolean;
}

export const toReadableSize = (size: number,
                               toBinary?: boolean
): string => {
  const unit: string[] = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
  const divider: number = toBinary ? 1024 : 1000;
  const memory: number[] = [size];
  while (true) {
    const temp: number = memory[memory.length - 1];
    if (temp < divider) {
      break;
    }
    memory.push(temp / divider);
  }
  return `${memory[memory.length - 1].toFixed(2)}${unit[memory.length - 1]}B`;
};

export const getExtension = (filename: string | undefined): string => {
  if (!filename || !filename.includes('.')) {
    return '';
  }
  const split: string[] = filename.split('.');
  if (split.length >= 2) {
    return split[split.length - 1].toLowerCase();
  }
  return '';
};

export function isFile(value: File | FileItemView | FileItem | undefined): value is File {
  return !!value
    && typeof (value as any).name !== 'undefined'
    && typeof (value as any).ext === 'undefined';
}

export function equals(a: File | FileItem | FileItemView | undefined,
                       b: File | FileItem | FileItemView | undefined
): boolean {
  if (isEmpty(a) && isEmpty(b)) {
    return true;
  }
  const aFile = {
    filename: isFile(a) ? a.name : a?.filename,
    size:     a?.size,
  };
  const bFile = {
    filename: isFile(b) ? b.name : b?.filename,
    size:     b?.size
  };
  return objectEquals(aFile, bFile);
}

export function toView(value: File | FileItem | FileItemView): FileItemView {
  return {
    id:            (value as any).id || undefined,
    filename:      isFile(value) ? value.name : value.filename,
    ext:           isFile(value) ? getExtension(value.name) : value.ext,
    size:          value.size,
    readableSize:  toReadableSize(value.size),
    multipartFile: isFile(value) ? value : undefined,
  };
}

export const fileItemToView = (fileItem: FileItem): FileItemView => {
  return {
    id:           fileItem.id,
    filename:     fileItem.filename,
    ext:          fileItem.ext,
    size:         fileItem.size,
    readableSize: toReadableSize(fileItem.size)
  };
};
export const fileToView = (file: File): FileItemView => {
  return {
    filename:      file.name,
    ext:           getExtension(file.name),
    size:          file.size,
    readableSize:  toReadableSize(file.size),
    multipartFile: file,
  };
};
