import React, {
  useState,
  createRef,
  useEffect
} from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel
} from '@mui/material';
import {
  FormikValues,
  useFormikContext
} from 'formik';
import Tooltip from 'components/Tooltip';
import {
  FileItem,
  FileItemParameter,
  FileItemView
} from 'file-item';
import { getObjectPostPosition } from 'util/KoreanLetterUtil';

export type FileInputProps = {
  variant?: 'standard' | 'filled' | 'outlined';
  name: string;
  label: string;
  placeholder?: string;
  tooltip?: string;
  value?: FileItem | FileItemView | null;
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
                     required: requiredProp,
                     disabled,
                     helperText,
                     sx,
                     size,
                     disableLabel
                   }: FileInputProps) => {
  const [mouseEnter, setMouseEnter] = useState<boolean>(false);
  const [helperMessage, setHelperMessage] = useState<React.ReactNode | undefined>(helperText);
  const [parameter, setParameter] = useState<FileItemParameter | undefined>();
  const ref = createRef<HTMLInputElement>();

  const required: boolean | undefined = !disableLabel && !disabled && requiredProp;
  const { setFieldValue, errors } = useFormikContext<FormikValues>();

  useEffect(() => {
    if (value) {
      setParameter({
        id: value.id,
      });
    }
  }, [value]);

  useEffect(() => {
    if (parameter) {
      setFieldValue(`${name}-temp`, parameter);
    }
    else {
      if (!value) {
        setFieldValue(`${name}-temp`, undefined);
      }
      else {
        setFieldValue(`${name}`, undefined);
        setFieldValue(`${name}-temp`, {
          id:            value.id,
          requestDelete: true,
        });
      }
    }
  }, [parameter]);

  useEffect(() => {
    if (errors && typeof errors[name] === 'string') {
      setHelperMessage(errors[name]);
    }
    else if (helperMessage !== helperText) {
      setHelperMessage(helperText);
    }
  }, [errors]);

  return (
    <Box sx={{
      display: 'flex',
      width:   '100%',
      height:  '100%',
    }}>
      <Grid container spacing={2} display="flex">
        <Grid item sm={(value || parameter) ? 8 : 10}>
          <Tooltip
            open={mouseEnter && !!value && typeof tooltip === 'string'}
            placement="bottom-start"
            title={
              disabled ? label
                : (tooltip ?? placeholder ?? `${label}${getObjectPostPosition(label)} 입력해 주세요`)
            }
          >
            <FormControl fullWidth
              id={`params-${name}`}
              variant={variant}
              size={size}
              required={required}
              disabled={disabled}
              sx={sx}
            >
              <InputLabel
                htmlFor={`params-${name}-label`}
                error={typeof errors[name] === 'string'}
              >
                {disableLabel ? undefined : label}
              </InputLabel>
              <Input disabled
                type="text"
                id={`params-${name}.filename`}
                value={parameter?.multipartFile?.name ?? value?.filename ?? ''}
                error={typeof errors[name] === 'string'}
                placeholder={placeholder ?? `${label}${getObjectPostPosition(label)} 입력해 주세요`}
                onMouseEnter={() => {
                  setMouseEnter(true);
                }}
                onMouseLeave={() => {
                  setMouseEnter(false);
                }}
              />
              {typeof errors[name] !== 'undefined' && (
                <FormHelperText error>
                  {helperMessage}
                </FormHelperText>
              )}
            </FormControl>
          </Tooltip>
          <input hidden
            type="file"
            accept="image/*"
            name="multipartFileInput"
            ref={ref}
            onChange={(e) => {
              const { files } = e.target;
              if (files && files.length > 0) {
                setParameter({
                  ...parameter,
                  requestDelete: true,
                  multipartFile: files[0],
                });
              }
              e.target.value = '';
            }}
          />
        </Grid>
        <Grid item
          sm={2}
          sx={{
            display:  'flex',
            flexWrap: 'wrap',
          }}>
          <Button fullWidth
            onClick={() => {
              ref.current?.click();
            }}>
            {value ? '변경' : '추가'}
          </Button>
        </Grid>
        {(value || parameter) && (
          <Grid item sm={2} display="flex">
            <Button fullWidth
              color="secondary"
              onClick={() => {
                setParameter(undefined);
              }}>
              삭제
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default FileInput;
