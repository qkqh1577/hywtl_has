import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { DataFieldProps, DataFieldValue, Option } from 'components';
import { getAuxiliaryPostPosition, getObjectPostPosition } from 'util/KoreanLetterUtil';

type Props = Omit<DataFieldProps, 'type' | 'options' | 'value'> & {
  options: Option[] | DataFieldValue[] | null;
  value: DataFieldValue;
  multiple?: boolean;
};

const DataSelector = (props: Props) => {
  const {
    variant = 'standard',
    name,
    label,
    placeholder,
    value: rawValue,
    multiple,
    setFieldValue,
    errors,
    errorText,
    required: requiredProp,
    disabled,
    readOnly,
    options,
    helperText,
    sx,
    size,
    onChange,
    disableLabel,
  } = props;

  const [helperMessage, setHelperMessage] = useState<React.ReactNode | undefined>(helperText);
  const [optionList, setOptionList] = useState<Option[] | null>(null);
  const [value, setValue] = useState<Option | null>(null);

  const required: boolean | undefined = !disableLabel && !(disabled || readOnly) && requiredProp;

  useEffect(() => {
    if (errors && errors[name]) {
      setHelperMessage(errorText ?? `${label}${getAuxiliaryPostPosition(label)} 필수 항목입니다.`);
    } else if (helperMessage !== helperText) {
      setHelperMessage(helperText);
    }
  }, [errors]);

  useEffect(() => {
    if (options === null) {
      setOptionList(null);
    } else {
      setOptionList(options.map((option) => {
        if (typeof option === 'string' || typeof option === 'number') {
          return {
            key: option,
            text: option
          };
        }
        return option;
      }));
    }
  }, [options]);

  useEffect(() => {
    if (!optionList || !rawValue) {
      setValue(null);
    } else {
      setValue({
        key: rawValue,
        text: optionList.find(option => option.key === rawValue)?.text ?? rawValue
      });
    }
  }, [rawValue, optionList]);

  return (
    <Autocomplete fullWidth
      id={`params-${name}`}
      options={optionList ?? []}
      loading={optionList === null || value === null}
      loadingText="불러오는 중"
      noOptionsText="검색 결과가 없습니다."
      placeholder={placeholder ?? `${label}${getObjectPostPosition(label)} 입력해 주세요`}
      value={optionList ? value : null}
      isOptionEqualToValue={(option, value) => {
        if (!value) {
          return false;
        }
        return option.key === value.key;
      }}
      onChange={(e, newValue) => {
        setFieldValue(name, newValue?.key ?? '');
        if (onChange) {
          onChange(e, newValue?.key ?? '');
        }
      }}
      onInputChange={(e, value, reason) => {
        if (reason === 'clear') {
          setFieldValue(name, '');
          if (onChange) {
            onChange(e, '');
          }
        }
      }}
      getOptionLabel={(option) => `${option.text}`}
      sx={sx}
      size={size}
      disabled={disabled}
      readOnly={readOnly}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={label}
            variant={variant}
            error={typeof errors[name] !== 'undefined'}
            helperText={helperMessage}
            required={required}
            fullWidth
          />
        );
      }}
    />
  );
};
export default DataSelector;
