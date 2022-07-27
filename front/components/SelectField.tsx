import {
  Autocomplete,
  AutocompleteProps,
  TextField
} from '@mui/material';
import React, {
  useMemo
} from 'react';
import {
  DataFieldValue,
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
    | 'label'> {
  options: Option[] | DataFieldValue[] | null;
  readOnly?: boolean;
  disableLabel?: boolean;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  name: string;
  label: string;
  helperText?: string;
  required?: boolean;
}

type RenderInput = (params: AutocompleteRenderInputParams) => React.ReactNode;

function isOptionEqualToValue(option: Option,
                              value: Option
) {
  if (!value) {
    return false;
  }
  return option.key === value.key;
}

export default function SelectField<Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined>(props: SelectFieldProps<Multiple, DisableClearable, FreeSolo>) {
  const {
          name,
          label,
          disableLabel,
          readOnly,
          startAdornment,
          endAdornment,
          helperText,
          required,
          onChange: propsOnChange,
          options:  propsOptions,
          ...       rest
        } = props;
  const { values, errors, handleChange } = useFormikContext<FormikValues>();
  const error = useMemo(() => !!errors[name], [errors]);
  const value = useMemo(() => values[name], [values]);
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
    handleChange(event);
  };

  const renderInput: RenderInput = (params) => {
    return (
      <TextField
        {...params}
        fullWidth
        variant="standard"
        name={name}
        required={required}
        label={disableLabel ? undefined : label}
        error={error}
        helperText={error ? `${label}${getAuxiliaryPostPosition(label)} 필수 항목입니다.` : helperText}
        InputProps={{
          ...params.InputProps,
          readOnly,
          startAdornment,
          endAdornment,
        }}
      />
    );
  };

  return (
    <Autocomplete
      fullWidth
      {...rest}
      getOptionLabel={(option) => `${option.text}`}
      isOptionEqualToValue={isOptionEqualToValue}
      options={options}
      renderInput={renderInput}
      value={value}
      onChange={onChange}
    />
  );
}