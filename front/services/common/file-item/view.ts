import FileItem from 'services/common/file-item/entity';

type FileItemView = {
  id?: number;
  filename: string;
  ext: string;
  size: number;
  readableSize: string;
  multipartFile?: File;
}

export const toReadableSize = (size: number, toBinary?: boolean): string => {
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
  return `${memory[memory.length - 1].toFixed(2)}${unit[memory.length]}`;
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

export const fileItemToView = (fileItem: FileItem): FileItemView => {
  return {
    id: fileItem.id,
    filename: fileItem.filename,
    ext: fileItem.ext,
    size: fileItem.size,
    readableSize: toReadableSize(fileItem.size)
  };
};
export const fileToView = (file: File): FileItemView => {
  return {
    filename: file.name,
    ext: getExtension(file.name),
    size: file.size,
    readableSize: toReadableSize(file.size),
  };
};

export default FileItemView;
