import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { DataFieldProps, DataFieldValue, Option } from 'components';
import { getObjectPostPosition } from 'util/KoreanLetterUtil';

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
    required,
    disabled,
    options,
    helperText,
    sx,
    size
  } = props;

  const [helperMessage, setHelperMessage] = useState<React.ReactNode | undefined>(helperText);
  const [optionList, setOptionList] = useState<Option[] | null>(null);
  const [value, setValue] = useState<Option | null>(null);

  useEffect(() => {
    if (errors && typeof errors[name] === 'string') {
      setHelperMessage(errors[name]);
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
    <Autocomplete
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
      }}
      onInputChange={(e, value, reason) => {
        if (reason === 'clear') {
          setFieldValue(name, '');
        }
      }}
      getOptionLabel={(option) => `${option.text}`}
      sx={sx}
      size={size}
      disabled={disabled === true}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={label}
            variant={variant}
            error={typeof errors[name] === 'string'}
            helperText={helperMessage}
            required={disabled !== true && required === true}
            fullWidth
          />
        );
      }}
    />
  );
};
export default DataSelector;
