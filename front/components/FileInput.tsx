import { Box, Button, FormControl, Grid, Input, InputLabel } from '@mui/material';
import { ErrorMessage } from 'formik';
import React, { useState, createRef, useEffect } from 'react';
import FileItem from 'services/common/file-item/entity';
import FileItemParameter from 'services/common/file-item/parameter';

export type FileInputProps = {
  id: string;
  fileItem?: FileItem;
  setFieldValue: (field: string, value: any) => void;
}

const FileInput = (props: FileInputProps) => {
  const { id, fileItem, setFieldValue } = props;
  const [params, setParams] = useState<FileItemParameter | undefined>();
  const ref = createRef<HTMLInputElement>();

  useEffect(() => {
    if (fileItem) {
      setParams({
        id: fileItem.id,
      });
    }
  }, [fileItem]);

  useEffect(() => {
    if (params) {
      setFieldValue(`${id}-temp`, params);
    } else {
      if (typeof fileItem === 'undefined') {
        setFieldValue(`${id}-temp`, undefined);
      } else {
        setFieldValue(`${id}`, undefined);
        setFieldValue(`${id}-temp`, {
          id: fileItem.id,
          requestDelete: true,
        });
      }
    }
  }, [params]);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
      }}>
      <Grid container spacing={1} display="flex">
        <Grid item sm={(fileItem || params) ? 8 : 10}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor={`params-${id}-label`}>프로필 사진</InputLabel>
            <Input
              type="text"
              id={`params-${id}.filename`}
              value={params?.multipartFile?.name ?? fileItem?.filename ?? ''}
              placeholder="이미지 파일을 선택하세요"
              disabled
            />
            <ErrorMessage name={`params-${id}`} />
          </FormControl>
          <input
            type="file"
            name="multipartFileInput"
            ref={ref}
            onChange={(e) => {
              const { files } = e.target;
              if (files && files.length > 0) {
                setParams({
                  ...params,
                  requestDelete: true,
                  multipartFile: files[0],
                });
              }
              e.target.value = '';
            }}
            hidden
          />
        </Grid>
        <Grid item sm={2} sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              ref.current?.click();
            }}
            fullWidth
          >
            {fileItem ? '변경' : '추가'}
          </Button>
        </Grid>
        {(fileItem || params) && (
          <Grid item sm={2} display="flex">
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                setParams(undefined);
              }}
              fullWidth
            >
              삭제
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default FileInput;
