import {
  Box,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  DataFieldValue,
  FieldStatus,
  getValue,
  isOption,
  LabelProps,
  MuiTextFieldProps,
  Option
} from 'components/DataFieldProps';
import {
  FormikContext,
} from 'formik';
import { getAuxiliaryPostPosition } from 'util/KoreanLetterUtil';
import { ColorPalette } from 'app/view/App/theme';
import RequiredMark from 'components/RequiredMark';

export interface SelectFieldProps
  extends Omit<MuiTextFieldProps,
    | 'name'
    | 'label'
    | 'value'
    | 'fullWidth'
    | 'disabled'> {
  options: Option[] | DataFieldValue[] | null;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  name: string;
  label: string;
  labelProps?: LabelProps;
  status?: FieldStatus;
  multiple?: boolean;
}

interface FieldProps
  extends Pick<MuiTextFieldProps,
    | 'variant'
    | 'onChange'
    | 'InputProps'
    | 'inputProps'
    | 'SelectProps'
    | 'label'
    | 'error'
    | 'helperText'
    | 'value'
    | 'disabled'
    | 'required'
    | 'children'> {
  name: string;
}

interface ViewProps
  extends Omit<SelectFieldProps, | 'status'
                                 | 'startAdornment'
                                 | 'endAdornment'
                                 | 'label'
                                 | 'labelProps'
                                 | 'options'>,
          Pick<MuiTextFieldProps, | 'value'
                                  | 'variant'> {
  fieldRef: React.RefObject<HTMLDivElement>;
}

function FieldView(props: ViewProps) {

  return <TextField
    fullWidth
    select
    ref={props.fieldRef}
    {...props}
  />;
}

export default function SelectField(props: SelectFieldProps) {
  const {
          name,
          startAdornment,
          endAdornment,
          required,
          status,
          multiple,
          defaultValue,
          InputProps,
          SelectProps,
          onChange,
          options,
          variant = 'standard',
          labelProps,
          label:      propsLabel,
          helperText: propsHelperText,
          ...         restProps
        } = props;

  const fieldRef = useRef<HTMLDivElement>(null);

  const children = useMemo((): React.ReactNode[] | null => {
    if (!options) {
      return null;
    }

    return [{ key: '', text: '선택' }, ...options]
    .map((option) => {
      if (isOption(option)) {
        if (option.invisible) {
          return null;
        }
        return (
          <MenuItem
            key={option.key}
            value={option.key}
            disabled={option.disabled}
            children={option.text}
          />
        );
      }
      return (
        <MenuItem
          key={option}
          value={option}
          children={option}
        />
      );
    })
    .filter(option => option !== null);
  }, [options]);

  const formikContext = useContext(FormikContext);
  const values = formikContext?.values ?? {};
  const errors = formikContext?.errors ?? {};
  const handleChange = formikContext?.handleChange ?? undefined;

  const formikEdit = values.edit || typeof values.edit === 'undefined';
  const formikError = !!errors[name];

  const value = useMemo(() => getValue<any>(values, name) ?? '', [values]);
  const [edit, setEdit] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const label = useMemo(() => labelProps?.disableLabel ? undefined : propsLabel, [propsLabel, labelProps]);
  const helperText = useMemo(() => error ? `${propsLabel}${getAuxiliaryPostPosition(propsLabel)} 필수 항목입니다.` : propsHelperText, [propsLabel, propsHelperText]);

  const disabled = useMemo(() => status === FieldStatus.Disabled, [status]);
  const readOnly = useMemo(() => status === FieldStatus.ReadOnly || !edit, [status, edit]);

  useEffect(() => {
    if (formikEdit !== edit) {
      setEdit(formikEdit);
    }
  }, [formikEdit]);

  useEffect(() => {
    if (formikError !== error) {
      setError(formikError);
    }
  }, [formikError]);

  const fieldProps: FieldProps = {
    variant,
    name,
    value:       children === null || !options || options.length === 0 ? '' : value,
    error,
    helperText,
    disabled,
    onChange:    (e) => {
      if (onChange) {
        onChange(e);
      }
      handleChange(e);
    },
    InputProps:  {
      ...InputProps,
      readOnly,
      startAdornment,
      endAdornment: <>
                      {endAdornment}
                      {InputProps?.endAdornment}
                    </>,
    },
    SelectProps: {
      ...SelectProps,
      multiple,
      sx:        {
        height:               '32px',
        fontSize:             '13px',
        color:                ColorPalette._252627,
        border:               variant === 'outlined' ? `1px solid ${ColorPalette._e4e9f2}` : 'none',
        borderBottom:         `1px solid ${ColorPalette._e4e9f2}`,
        borderRadius:         variant === 'outlined' ? '5px' : '0',
        backgroundColor:      ColorPalette._fff,
        '& .MuiSvgIcon-root': {
          color: ColorPalette._386dd6,
        }
      },
      MenuProps: {
        sx: {
          '& > .MuiMenu-paper': {
            marginTop:    variant === 'outlined' ? '-8px' : '4px',
            marginLeft:   variant === 'outlined' ? '8px' : 0,
            overflowY:    'scroll',
            borderRadius: '5px',
            boxShadow:    `2px 2px 10px 0px ${ColorPalette._b2b4b7}`,
            maxHeight:    `${28 * 5}px`,
            width:        fieldRef.current?.offsetWidth ? `${fieldRef.current!.offsetWidth}px` : 'auto',

            '& > ul':      {
              padding:      0,
              borderRadius: '5px 0 0 5px',
            },
            '& > ul > li': {
              fontSize:   '13px',
              color:      ColorPalette._252627,
              minHeight:  '28px',
              padding:    '0 10px',
              wordBreak:  'break-all',
              whiteSpace: 'break-spaces',
            },

            '&::-webkit-scrollbar':       {
              width:           '10px',
              backgroundColor: ColorPalette._e4e9f2,
              borderRadius:    '0 5px 5px 0',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: ColorPalette._697183,
              borderRadius:    '0 5px 5px 0',
            }
          },
        }
      }
    },
    children
  };

  if (!labelProps?.disableLabel) {
    return (
      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '100%',
        flex:           1,
        justifyContent: 'space-between',
        height:         '100%',
      }}>
        <Box sx={{
          display:    'flex',
          flexWrap:   'nowrap',
          height:     '100%',
          alignItems: 'center',
        }}>
          <Typography sx={{
            fontSize:  '13px',
            color:     ColorPalette.Grey['1'],
            wordBreak: 'keep-all',
            width:     '110px'
          }}>
            <RequiredMark required={edit && required} text={label} />
          </Typography>
        </Box>
        <Box sx={{
          display:  'flex',
          height:   '100%',
          flexWrap: 'nowrap',
          width:    'calc(100% - 130px)',
        }}>
          <FieldView
            fieldRef={fieldRef}
            {...restProps}
            {...fieldProps}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{
      display:        'flex',
      flexWrap:       'nowrap',
      width:          '100%',
      flex:           1,
      justifyContent: 'space-between',
    }}>
      <Box sx={{
        display:  'flex',
        flexWrap: 'nowrap',
        width:    '100%',
      }}>
        <FieldView
          fieldRef={fieldRef}
          {...restProps}
          {...fieldProps}
        />
      </Box>
    </Box>
  );

}