import React, {
  useMemo
} from 'react';
import {
  DataFieldValue,
  FieldStatus,
  isOption,
  MuiTextFieldProps,
  Option
} from 'components/DataFieldProps';
import {
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import { getAuxiliaryPostPosition } from 'util/KoreanLetterUtil';
import { useDataProps } from 'components/DataField';

export interface RadioFieldProps
  extends Pick<MuiTextFieldProps, | 'onChange' | 'onBlur'>,
          Omit<FormControlProps, | 'variant'
                                 | 'disabled'
                                 | 'fullWidth'
                                 | 'name'
                                 | 'label'
                                 | 'onChange'
                                 | 'onBlur'
                                 | 'value'> {
  disableLabel?: boolean;
  name: string;
  label: string;
  status?: FieldStatus;
  options: Option[] | DataFieldValue[];
  disableText?: boolean;
  helperText?: string;
}

export function useRadioField(props: RadioFieldProps): React.ReactNode[] {

  const {
          name,
          options,
          disableText,
        } = props;

  const children = useMemo(() => {
    return options.map((option): Option => {
      if (isOption(option)) {
        return option;
      }
      return {
        key:  option,
        text: option,
      };
    });
  }, [options]);

  const {
          value,
          onChange,
          onBlur,
          disabled,
          readOnly,
        } = useDataProps(props);

  const result: React.ReactNode[] = [];

  for (let i = 0; i < children.length; i++) {
    const option = children[i];
    const {
            key,
            text,
            disabled: childDisabled,
            invisible
          } = option;

    if (invisible) {
      continue;
    }

    const Item = (
      <Radio
        key={key}
        disabled={disabled || childDisabled}
        readOnly={readOnly}
        name={name}
        value={key}
        checked={key === value}
        onChange={(e) => {
          console.log(e);
          onChange(e);
        }}
        onBlur={(e) => {
          console.log(e);
          onBlur(e);
        }}
      />
    );
    if (disableText) {
      result.push(Item);
    }
    else {
      result.push(
        <FormControlLabel
          key={key}
          label={text}
          control={Item}
        />
      );
    }
  }
  return result;
}

export default function RadioField(props: RadioFieldProps) {

  const {
          name,
          label,
          disableLabel,
          status,
          options,
          onChange,
          onBlur,
          ...rest
        } = props;

  const {
          error,
          required,
          helperText
        } = useDataProps(props);
  const radio = useRadioField(props);

  return (
    <FormControl
      {...rest}
      fullWidth
      variant="standard"
      required={required}
    >
      {!disableLabel && (
        <FormLabel component="legend">
          {label}
        </FormLabel>
      )}
      <RadioGroup name={name}>
        {radio}
      </RadioGroup>
      <FormHelperText error={error}>
        {error ? `${label}${getAuxiliaryPostPosition(label)} 필수 항목입니다.` : helperText}
      </FormHelperText>
    </FormControl>
  );
}