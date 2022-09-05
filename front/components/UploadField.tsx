import { FieldStatus } from 'components/DataFieldProps';
import React, {
  ChangeEvent,
  useContext,
  useMemo,
  useRef
} from 'react';
import { FormikContext } from 'formik';
import {
  FileItemView,
  fileToView
} from 'file-item';
import { Box } from '@mui/material';
import TextField from 'components/TextField';
import Button from 'layouts/Button';
import useDialog from 'components/Dialog';

interface UploadFieldProps {
  accept?: string;
  name: string;
  label: string;
  status?: FieldStatus;
}

export default function UploadField(props: UploadFieldProps) {
  const { accept, name, label, status } = props;
  const { error } = useDialog();
  const formikContext = useContext(FormikContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files || e.target.files.length === 0) {
      console.error('no file');
      return;
    }
    const file = fileToView(e.target.files![0]);
    formikContext?.setFieldValue(name, file);
  };

  const file: FileItemView | undefined = formikContext?.values[name];

  const isView = status === FieldStatus.ReadOnly || status === FieldStatus.View;
  const isDisabled = status === FieldStatus.Disabled;
  const endAdornment = useMemo(() => {
    if (isDisabled) {
      return undefined;
    }
    if (isView) {
      if (file) {
        return (
          <Button shape="basic1" onClick={() => {
            if (file) {
              window.open(`/file-items/${file.id}`, '_blank');
            }
            else {
              error('파일을 찾을 수 없습니다.');
            }
          }}>
            다운로드
          </Button>
        );
      }
      return undefined;
    }
    else {
      return (
        <Button shape="basic1" onClick={() => {
          inputRef.current?.click();
        }}>
          파일선택
        </Button>
      );
    }
  }, [isView, isDisabled, file]);


  return (
    <Box sx={{
      width:   '100%',
      display: 'flex',
    }}>
      <TextField
        name={`${name}.filename`}
        label={label}
        status={FieldStatus.ReadOnly}
        labelPosition="top"
        endAdornment={endAdornment}
      />
      <input type="file" ref={inputRef} accept={accept} style={{ display: 'none' }} onChange={onChange} />
    </Box>
  );
}
