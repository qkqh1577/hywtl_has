import React, { useMemo } from 'react';
import {
  DataFieldValue,
  FieldStatus,
  isOption,
  Option
} from 'components/DataFieldProps';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormGroup,
  FormHelperText,
  FormLabel
} from '@mui/material';
import {
  FormikValues,
  useFormikContext
} from 'formik';
import { getAuxiliaryPostPosition } from 'util/KoreanLetterUtil';

export interface CheckboxFieldProps
  extends Omit<FormControlProps, | 'variant'
                                 | 'disabled'
                                 | 'fullWidth'
                                 | 'name'
                                 | 'label'
                                 | 'value'> {
  disableLabel?: boolean;
  name: string;
  label: string;
  status?: FieldStatus;
  /** 전체 선택, 선택 해제의 문구, default="전체" */
  allText?: string;
  /** 전체 선택, 선택 해제 사용 여부 */
  disableAll?: boolean;
  options: Option[] | DataFieldValue[];
  helperText?: string;
}

function isChecked(values: DataFieldValue[] | undefined,
                   value: DataFieldValue
): boolean {
  if (typeof values === 'undefined') {
    return true;
  }
  if (values.length === 0) {
    return false;
  }
  return values.filter((v) => v === value).length === 1;
}

export default function CheckboxField(props: CheckboxFieldProps) {

  const {
          name,
          label,
          disableLabel,
          disableAll,
          allText,
          status,
          helperText,
          required,
          options: propsOptions,
          ...      rest
        } = props;
  const { values, errors, setFieldValue } = useFormikContext<FormikValues>();
  const value: DataFieldValue[] | undefined = values[name];
  const edit = values.edit || typeof values.edit === 'undefined';
  const disabled = status === FieldStatus.Disabled;
  const readOnly = status === FieldStatus.ReadOnly && !edit;
  const error = !!errors[name];
  const options = useMemo(() => {
    return propsOptions.map((option) => {
      if (isOption(option)) {
        return option;
      }
      return {
        key:  option,
        text: option,
      };
    });
  }, [propsOptions]);

  const allChecked = typeof value === 'undefined' || options.length === value.length;

  return (
    <FormControl
      {...rest}
      fullWidth
      variant="standard"
      required={edit && required}
    >
      {!disableLabel && (
        <FormLabel component="legend">
          {label}
        </FormLabel>
      )}
      <FormGroup row>
        {!disableAll && (
          <FormControlLabel
            label={allText ?? '전체'}
            control={
              <Checkbox
                disabled={disabled}
                readOnly={readOnly}
                checked={allChecked}
                onChange={() => {
                  setFieldValue(name, allChecked
                    ? []
                    : undefined
                  );
                }}
              />
            }
          />
        )}
        {options.map((option) => {
          const {
                  key,
                  text
                } = option;
          const checked = isChecked(value, key);

          const onChange = () => {
            if (checked) {
              if (typeof value === 'undefined') {
                setFieldValue(
                  name,
                  options.map(
                    (option) => option.key)
                         .filter((v) => v !== key)
                );
              }
              else {
                setFieldValue(
                  name,
                  value.filter((v) => v !== key)
                );
              }
            }
            else {
              setFieldValue(name, [...(value ?? []), key]);
            }
          };
          return (
            <FormControlLabel
              key={key}
              label={text}
              control={
                <Checkbox
                  disabled={disabled}
                  readOnly={readOnly}
                  name={name}
                  value={key}
                  checked={checked}
                  onChange={onChange}
                />
              }
            />
          );
        })}
      </FormGroup>
      <FormHelperText error={error}>
        {error ? `${label}${getAuxiliaryPostPosition(label)} 필수 항목입니다.` : helperText}
      </FormHelperText>
    </FormControl>
  );
}