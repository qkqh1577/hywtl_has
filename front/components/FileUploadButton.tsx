import React, { createRef } from 'react';
import { FileItemView, fileToView } from 'services/common/file-item';
import { Button } from '@mui/material';

export type FileUploadButtonProps = {
  color?: 'primary' | 'secondary' | 'info' | 'success',
  variant?: 'text' | 'contained' | 'outlined';
  accept?: string;
  fileItem?: FileItemView;
  onClick: (fileItem: FileItemView) => void;
  children: string | React.ReactNode;
}

const FileUploadButton = ({
  color = 'primary',
  variant = 'contained',
  accept,
  onClick,
  children
}: FileUploadButtonProps) => {
  const ref = createRef<HTMLInputElement>();

  return (
    <Button
      color={color}
      variant={variant}
      onClick={() => {
        ref.current?.click();
      }}
      fullWidth
    >
      {children}
      <input
        type="file"
        accept={accept}
        name="multipartFileInput"
        ref={ref}
        onChange={(e) => {
          const { files } = e.target;
          if (files && files.length > 0) {
            onClick(fileToView(files[0]));
          }
          e.target.value = '';
        }}
        hidden
      />
    </Button>
  );
};

export default FileUploadButton;
