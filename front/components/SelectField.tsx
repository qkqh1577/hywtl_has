import {
  Autocomplete,
  AutocompleteProps,
  TextField
} from '@mui/material';
import React, { useMemo } from 'react';
import {
  DataFieldValue,
  FieldStatus,
  isOption,
  Option
} from 'components/DataFieldProps';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete/Autocomplete';
import {
  FormikValues,
  useFormikContext
} from 'formik';
import { getAuxiliaryPostPosition } from 'util/KoreanLetterUtil';

export interface SelectFieldProps<Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined>
  extends Omit<AutocompleteProps<Option, Multiple, DisableClearable, FreeSolo>,
    | 'options'
    | 'renderInput'
    | 'getOptionLabel'
    | 'isOptionEqualToValue'
    | 'label'
    | 'disabled'
    | 'readOnly'> {
  options: Option[] | DataFieldValue[] | null;
  disableLabel?: boolean;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  name: string;
  label: string;
  helperText?: string;
  required?: boolean;
  status?: FieldStatus;
}

type RenderInput = (params: AutocompleteRenderInputParams) => React.ReactNode;

function isOptionEqualToValue(option: Option,
                              value: any
) {
  if (!value) {
    return false;
  }
  if (isOption(value)) {
    return option.key === value.key;
  }
  return option.key === value;
}

function getValue(options: Option[],
                  value: any
): Option | undefined {
  return options.find(option => isOptionEqualToValue(option, value));
}

function arrange<T, >(item: T | undefined): item is T {
  return typeof item !== 'undefined';
}

export default function SelectField<Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined>(props: SelectFieldProps<Multiple, DisableClearable, FreeSolo>) {
  const {
          name,
          label,
          disableLabel,
          startAdornment,
          endAdornment,
          helperText,
          required,
          status,
          multiple,
          defaultValue,
          onChange: propsOnChange,
          options:  propsOptions,
          ...       rest
        } = props;
  const { values, errors, setFieldValue } = useFormikContext<FormikValues>();
  const value = values[name] ?? defaultValue;
  const edit = values.edit || typeof values.edit === 'undefined';
  const disabled = status === FieldStatus.Disabled;
  const readOnly = status === FieldStatus.ReadOnly && !edit;
  const error = !!errors[name];
  console.log(value);
  const options: Option[] = useMemo(() => {
    if (!propsOptions) {
      return [];
    }
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

  const onChange: typeof props['onChange'] = (event,
                                              value,
                                              reason,
                                              details
  ) => {
    if (propsOnChange) {
      propsOnChange(event, value, reason, details);
    }
    setFieldValue(name, value);
  };

  const renderInput: RenderInput = (params) => {
    return (
      <TextField
        {...params}
        fullWidth
        variant="standard"
        name={name}
        required={edit && required}
        disabled={disabled}
        label={disableLabel ? undefined : label}
        error={error}
        helperText={error ? `${label}${getAuxiliaryPostPosition(label)} 필수 항목입니다.` : helperText}
        InputProps={{
          ...params.InputProps,
          readOnly,
          startAdornment,
          endAdornment: <>
                          {endAdornment}
                          {params.InputProps.endAdornment}
                        </>
        }}
      />
    );
  };

  return (
    <Autocomplete
      fullWidth
      {...rest}
      multiple={multiple}
      getOptionLabel={(option) => `${option.text}`}
      isOptionEqualToValue={isOptionEqualToValue}
      options={options}
      inputValue={
        Array.isArray(value)
          ? value.map(v => getValue(options, v))
                 .filter(arrange)
                 .map(v => `${v.text}`)
                 .join()
          : `${getValue(options, value)?.text ?? ''}`
      }
      renderInput={renderInput}
      value={value}
      onChange={onChange}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
}