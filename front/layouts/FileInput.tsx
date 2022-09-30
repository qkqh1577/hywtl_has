import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  Box,
  InputAdornment
} from '@mui/material';
import Input, { InputProps } from 'layouts/Input';
import {
  equals,
  FileItem,
  FileItemView,
  toView
} from 'file-item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'layouts/Button';

interface Props {
  InputProps?: InputProps;
  accept?: string;
  preview?: 'small' | 'normal';
  disableDownload?: boolean;
  useClear?: boolean;
  value?: File | FileItem | FileItemView;
  onChange?: (file?: FileItemView) => void;
  mode: 'view' | 'edit';
}

export default function FileInput(props: Props) {
  const {
          accept,
          preview,
          disableDownload,
          useClear,
          value,
          mode,
        } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<FileItemView>();

  const onChange = useCallback((e?: ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target || !e.target.files || e.target.files.length === 0) {
      if (file?.id) {
        setFile({
          ...file,
          requestDelete: true,
        });
      }
      else {
        setFile(undefined);
      }
    }
    else {
      setFile(toView(e.target.files[0]));
    }

  }, [file]);

  useEffect(() => {
    if (value) {
      setFile(toView(value));
    }
  }, [value]);

  useEffect(() => {
    if (props.onChange && !equals(file, value)) {
      props.onChange(file);
    }
  }, [value, file, props.onChange]);

  return (
    <Box sx={{
      display:  'flex',
      width:    '100%',
      flexWrap: 'nowrap'
    }}>
      <Input
        readOnly
        value={file?.filename || ''}
        endAdornment={
          <InputAdornment position="end">
            {mode === 'edit' && useClear && (
              <FontAwesomeIcon
                icon="trash"
                style={{}}
                onClick={() => {
                  onChange();
                }}
              />
            )}
            {mode === 'edit' && (
              <Button shape="small" onClick={() => {
                inputRef.current?.click();
              }}>
                파일선택
              </Button>
            )}
            {mode === 'view' && !disableDownload && file?.id && (
              <Button
                shape="small"
                onClick={() => {
                  window.open(`/file-items/${file.id}`, '_blank');
                }}>
                다운로드
              </Button>
            )}
          </InputAdornment>
        }
        {...props.InputProps}
      />
      <input
        type="file"
        ref={inputRef}
        accept={accept}
        style={{ display: 'none' }}
        onChange={onChange}
      />
    </Box>
  );
}