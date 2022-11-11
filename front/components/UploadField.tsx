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
import { ColorPalette } from 'assets/theme';
import Input, { InputProps } from 'layouts/Input';
import TextBox from 'layouts/Text';
import defaultImage from 'assets/default-profile.png';

interface UploadFieldProps
  extends Omit<InputProps, |'onChange'> {
  accept?: string;
  preview?: boolean;
  edit?: boolean;
  disableDownload?: boolean;
  disableSelect?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadField({ accept, name, disableDownload, disableSelect, onChange, preview, edit, ...props }: UploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const file = useMemo(() => props.value ? toView(props.value as File | FileItemView) : undefined, [props.value]);
  const multipartFile = useMemo(() => props.value && (props.value as any).multipartFile ? (props.value as any).multipartFile : undefined, [file]);
  const [imageUrl, setImageUrl] = useState<string>();
  useEffect(() => {
    if (!file) {
      setImageUrl(undefined);
      return;
    }

    if (file.id) {
      setImageUrl(`/file-item/${file.id}`);
      return;
    }
    if (preview && multipartFile) {
      setImageUrl(URL.createObjectURL(multipartFile));
    }
  }, [file]);
  return (
    <Box sx={{
      width:         '100%',
      display:       'flex',
      flexWrap:      'nowrap',
      flexDirection: 'column',
    }}>
      {preview && (
        <Box>
          <img
            src={imageUrl ?? ''}
            alt="프로필 이미지"
            onError={(e) => {
              (e.target as any).src = defaultImage;
            }}
            style={{
              width:           '200px',
              height:          '200px',
              borderRadius:    '10px',
              backgroundColor: ColorPalette._b2b4b7,
            }}
          />
          {edit && (<Box sx={{
            marginLeft: 'calc((100px - 47.71px))'
          }}>
            <Button onClick={() => {
              inputRef.current?.click();
            }}>
              이미지 변경
            </Button>
            <TextBox variant="body13"
              sx={{
                marginLeft: '20px',
              }}>
              &#183; 권장 이미지 사이지 : 200x200
            </TextBox>
            <input type="file" ref={inputRef} accept={accept} style={{ display: 'none' }} onChange={onChange} />
          </Box>)
          }
        </Box>

      )}
      {!preview && (
        <Box sx={{
          width:        '100%',
          maxHeight:    '100px',
          marginRight:  '10px',
          padding:      '0 4px',
          display:      'flex',
          borderRadius: '5px',
          alignContent: 'flex-start',
          flex:         1,
          border:       `1px solid ${ColorPalette._e4e9f2}`
        }}>
          <Input
            {...props}
            value={file?.filename ?? ''}
            readOnly
            endAdornment={!props.disabled && (
              <InputAdornment position="end" sx={{ marginRight: '10px' }}>
                {file && !disableDownload && (
                  <Button shape="small" onClick={() => {
                    window.open(`/file-item/${file.id}`, '_blank');
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
      )}
    </Box>
  );
}
