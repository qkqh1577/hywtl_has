import React from 'react';
import { ErrorMessage } from 'formik';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { getObjectPostPosition } from 'util/KoreanLetterUtil';

type Value = string | number;

type Option = {
  key: Value;
  value: Value;
}

type Props = {
  type?: string;
  name: string;
  label: string;
  value: string | number | '';
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  required?: boolean;
  options?: Option[] | Value[];
}

const DataField = ({
  type = 'text',
  name,
  label,
  value,
  setFieldValue,
  required,
  options
}: Props) => {
  if (type === 'select') {
    if (!options) {
      throw 'property options required when type="select"';
    }

    return (
      <FormControl variant="standard" fullWidth required={required === true}>
        <InputLabel id={`params-${name}-label`}>{label}</InputLabel>
        <Select
          labelId={`params-${name}-label`}
          id={`params-${name}`}
          name={name}
          value={value}
          onChange={(e) => {
            setFieldValue(name, e.target.value ?? '');
          }}
        >
          {options.map((option) => {
            if (typeof option === 'string' || typeof option === 'number') {
              const item: Value = option as Value;
              return <MenuItem key={item} value={item}>{item}</MenuItem>;
            }
            const item: Option = option as Option;
            return <MenuItem key={item.key} value={item.key}>{item.value}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  }

  return (
    <TextField
      type={type}
      id={`params-${name}`}
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value ?? '');
      }}
      label={label}
      placeholder={`${label}${getObjectPostPosition(label)} 입력해 주세요`}
      helperText={<ErrorMessage name={name} />}
      variant="standard"
      fullWidth
      required={required === true}
    />
  );
};

export default DataField;
