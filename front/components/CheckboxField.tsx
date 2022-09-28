import React, {
  useContext,
  useMemo
} from 'react';
import {
  DataFieldValue,
  FieldProps,
  FieldStatus,
  getValue,
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
import { FormikContext, } from 'formik';
import { getAuxiliaryPostPosition } from 'util/KoreanLetterUtil';
import { ColorPalette } from 'app/view/App/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface CheckboxFieldProps
  extends FieldProps,
          Omit<FormControlProps, | 'variant'
                                 | 'disabled'
                                 | 'fullWidth'
                                 | 'name'
                                 | 'label'
                                 | 'value'> {
  /** 전체 선택, 선택 해제의 문구, default="전체" */
  allText?: string;
  /** 전체 선택, 선택 해제 사용 여부 */
  disableAll?: boolean;
  options: Option[] | DataFieldValue[];
  disableText?: boolean;
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

export function useCheckboxField(props: CheckboxFieldProps): React.ReactNode[] {

  const {
          name,
          disableAll,
          allText,
          status,
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

  const formikContext = useContext(FormikContext);

  const { values, setFieldValue } = formikContext ?? {};
  const value = values ? getValue<DataFieldValue[]>(values, name) : undefined;
  const edit = values.edit || typeof values.edit === 'undefined';
  const disabled = status === FieldStatus.Disabled;
  const readOnly = formikContext ? status === FieldStatus.ReadOnly && !edit : true;

  const allChecked = formikContext ? typeof value === 'undefined' || children.length === value.length : false;

  const result: React.ReactNode[] = [];

  if (!disableAll) {
    const Check = (
      <Checkbox
        key="all"
        disabled={disabled}
        readOnly={readOnly}
        checked={allChecked}
        checkedIcon={<FontAwesomeIcon icon="check" />}
        onChange={() => {
          setFieldValue(name, allChecked
            ? []
            : undefined
          );
        }}
        sx={{
          width:        '22px',
          height:       '22px',
          borderRadius: '5px',
          overflow:     'hidden',
          border:       `1px solid ${allChecked ? ColorPalette._9bb6ea : ColorPalette._e4e9f2}`,
          '&:hover':    {
            border: `1px solid ${ColorPalette._0047d3}`,
          },
          '& > svg':    {
            backgroundColor: `${ColorPalette._ffffff} !important`,
            color:           `${allChecked ? ColorPalette._386dd6 : ColorPalette._ffffff} !important`,
          }
        }}
      />
    );
    if (disableText) {
      result.push(Check);
    }
    result.push(
      <FormControlLabel
        key="all"
        label={allText ?? '전체'}
        control={Check}
        sx={{
          marginRight:                   '20px',
          alignItems:                    'center',
          '& > span.MuiTypography-root': {
            marginLeft: '6px',
            fontWeight: 'normal',
            fontSize:   '13px',
            lineHeight: '20px',
            color:      ColorPalette._252627,
          }
        }}
      />
    );
  }
  for (let i = 0; i < children.length; i++) {
    const option = children[i];
    const {
            key,
            text,
            disabled: childDisabled,
            invisible
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
    if (invisible) {
      continue;
    }

    const Check = (
      <Checkbox
        key={key}
        disabled={disabled || childDisabled}
        readOnly={readOnly}
        name={name}
        value={key}
        checked={checked}
        checkedIcon={<FontAwesomeIcon icon="check" />}
        onChange={onChange}
        sx={{
          width:        '22px',
          height:       '22px',
          borderRadius: '5px',
          overflow:     'hidden',
          border:       `1px solid ${checked ? (disabled || childDisabled ? ColorPalette._e4e9f2 : ColorPalette._9bb6ea) : ColorPalette._e4e9f2}`,
          '&:hover':    {
            border: disabled || childDisabled ? ColorPalette._e4e9f2 : `1px solid ${ColorPalette._0047d3}`,
          },
          '& > svg':    {
            backgroundColor: `${ColorPalette._ffffff} !important`,
            color:           `${checked ? (disabled || childDisabled ? ColorPalette._e4e9f2 : ColorPalette._386dd6) : ColorPalette._ffffff} !important`,
          }
        }}
      />
    );
    if (disableText) {
      result.push(Check);
    }
    else {
      result.push(
        <FormControlLabel
          key={key}
          label={text}
          control={Check}
          sx={{
            marginRight:                   i < children.length ? '20px' : 0,
            alignItems:                    'center',
            '& > span.MuiTypography-root': {
              marginLeft: '6px',
              fontWeight: 'normal',
              fontSize:   '13px',
              lineHeight: '20px',
              color:      ColorPalette._252627,
            }
          }}
        />
      );
    }
  }
  return result;
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
          options,
          ...rest
        } = props;

  const checkbox = useCheckboxField(props);
  const formikContext = useContext(FormikContext);
  const { values, errors } = formikContext ?? {};
  const edit = values?.edit || typeof values?.edit === 'undefined';
  const error = errors ? !!errors[name] : false;

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
        {checkbox}
      </FormGroup>
      <FormHelperText error={error}>
        {error ? `${label}${getAuxiliaryPostPosition(label)} 필수 항목입니다.` : helperText}
      </FormHelperText>
    </FormControl>
  );
}