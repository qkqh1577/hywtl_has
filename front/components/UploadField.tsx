import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  FileItemView,
  toView
} from 'file-item';
import {
  Box,
  InputAdornment
} from '@mui/material';
import Button from 'layouts/Button';
import { ColorPalette } from 'app/view/App/theme';
import Input, { InputProps } from 'layouts/Input';

interface UploadFieldProps
  extends Omit<InputProps, |'onChange'> {
  accept?: string;
  preview?: boolean;
  disableDownload?: boolean;
  disableSelect?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadField({ accept, name, disableDownload, disableSelect, onChange, ...props }: UploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const file = useMemo(() => props.value ? toView(props.value as File | FileItemView) : undefined, [props.value]);
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {

    console.log(file);
    if (!file) {
      setImageUrl(undefined);
      return;
    }

    if (file.id) {
      setImageUrl(`/file-items/${file.id}`);
      return;
    }
    if (file.multipartFile) {
      setImageUrl(URL.createObjectURL(file.multipartFile));
    }

  }, [file]);
  return (
    <Box sx={{
      width:    '100%',
      display:  'flex',
      flexWrap: 'nowrap',
    }}>
      {props.preview && file && (
        <Box sx={{
          width:        '100px',
          maxHeight:    '100px',
          marginRight:  '10px',
          padding:      '0 4px',
          display:      'flex',
          borderRadius: '5px',
          alignContent: 'flex-start',
          flex:         1,
          border:       `1px solid ${ColorPalette._e4e9f2}`
        }}>
          <img
            width="60px"
            src={imageUrl}
            alt="프로필 이미지"
            style={{
              objectFit: 'contain'
            }}
          />
        </Box>
      )}
      <Input
        {...props}
        value={file?.filename ?? ''}
        readOnly
        endAdornment={!props.disabled && (
          <InputAdornment position="end">
            {file && !disableDownload && (
              <Button shape="small" onClick={() => {
                window.open(`/file-items/${file.id}`, '_blank');
              }}>
                다운로드
              </Button>
            )}
            {!disableSelect && (
              <Button onClick={() => {
                inputRef.current?.click();
              }}>
                파일선택
              </Button>
            )}
          </InputAdornment>
        )
        }
      />
      <input type="file" ref={inputRef} accept={accept} style={{ display: 'none' }} onChange={onChange} />
    </Box>
  );
}
