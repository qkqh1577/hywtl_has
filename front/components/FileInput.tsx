import React, { useState, createRef, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel
} from '@mui/material';
import { FormikErrors, FormikValues } from 'formik';
import { Tooltip } from 'components';
import {
  FileItem,
  FileItemParameter,
  FileItemView
} from 'services/common/file-item';
import { getObjectPostPosition } from 'util/KoreanLetterUtil';

export type FileInputProps = {
  variant?: 'standard' | 'filled' | 'outlined';
  name: string;
  label: string;
  placeholder?: string;
  tooltip?: string;
  value?: FileItem | FileItemView | null;
  setFieldValue: (field: string, value: any) => void;
  errors: FormikErrors<FormikValues>;
  required?: boolean;
  disabled?: boolean;
  helperText?: string | React.ReactNode;
  sx?: object;
  size?: 'small';
  disableLabel?: boolean;
}

const FileInput = ({
  variant = 'standard',
  name,
  label,
  placeholder,
  tooltip,
  value,
  setFieldValue,
  errors,
  required,
  disabled,
  helperText,
  sx,
  size,
  disableLabel
}: FileInputProps) => {
  const [mouseEnter, setMouseEnter] = useState<boolean>(false);
  const [helperMessage, setHelperMessage] = useState<React.ReactNode | undefined>(helperText);
  const [params, setParams] = useState<FileItemParameter | undefined>();
  const ref = createRef<HTMLInputElement>();

  useEffect(() => {
    if (value) {
      setParams({
        id: value.id,
      });
    }
  }, [value]);

  useEffect(() => {
    if (params) {
      setFieldValue(`${name}-temp`, params);
    } else {
      if (!value) {
        setFieldValue(`${name}-temp`, undefined);
      } else {
        setFieldValue(`${name}`, undefined);
        setFieldValue(`${name}-temp`, {
          id: value.id,
          requestDelete: true,
        });
      }
    }
  }, [params]);

  useEffect(() => {
    if (errors && typeof errors[name] === 'string') {
      setHelperMessage(errors[name]);
    } else if (helperMessage !== helperText) {
      setHelperMessage(helperText);
    }
  }, [errors]);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
      }}>
      <Grid container spacing={2} display="flex">
        <Grid item sm={(value || params) ? 8 : 10}>
          <Tooltip
            title={
              disabled === true
                ? label
                : (tooltip ?? placeholder ?? `${label}${getObjectPostPosition(label)} 입력해 주세요`)
            }
            open={mouseEnter && !!value && typeof tooltip === 'string'}
            placement="bottom-start"
          >
            <FormControl
              id={`params-${name}`}
              variant={variant}
              size={size}
              required={!(disabled === true) && required === true}
              disabled={disabled === true}
              sx={sx}
              fullWidth
            >
              <InputLabel
                htmlFor={`params-${name}-label`}
                error={typeof errors[name] === 'string'}
              >
                {disableLabel ? undefined : label}
              </InputLabel>
              <Input
                type="text"
                id={`params-${name}.filename`}
                value={params?.multipartFile?.name ?? value?.filename ?? ''}
                onMouseEnter={() => {
                  setMouseEnter(true);
                }}
                onMouseLeave={() => {
                  setMouseEnter(false);
                }}
                error={typeof errors[name] === 'string'}
                placeholder={placeholder ?? `${label}${getObjectPostPosition(label)} 입력해 주세요`}
                disabled
              />
              <FormHelperText
                error={typeof errors[name] === 'string'}
              >
                {helperMessage}
              </FormHelperText>
            </FormControl>
          </Tooltip>
          <input
            type="file"
            accept="image/*"
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
            {value ? '변경' : '추가'}
          </Button>
        </Grid>
        {(value || params) && (
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
