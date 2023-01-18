import {
  Box,
  MenuItem,
  TextFieldProps
} from '@mui/material';
import { ColorPalette } from 'assets/theme';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Select from 'layouts/Select';
import Input from 'layouts/Input';
import React, {
  useCallback,
  useContext
} from 'react';
import { FormikContext } from 'formik';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import {
  snackbarAction,
  SnackbarSeverityType
} from 'components/Snackbar/action';

export default function () {
  const dispatch = useDispatch();
  const openSnackbar = useCallback((message,
                                    severity: SnackbarSeverityType = SnackbarSeverityType.warning
  ) => {
    dispatch(snackbarAction.show({ message, severity }));
  }, [dispatch]);
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;

  return (
    <Box sx={{
      display:      'flex',
      flexWrap:     'wrap',
      width:        '100%',
      border:       `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius: '5px',
      height:       '200px',
      margin:       '10px 0px',
      padding:      '10px',
    }}>
      <Box sx={{
        display: 'flex',
        width:   '100%',
      }}>
        <Box sx={{ width: '45%', marginBottom: '15px' }}>
          <DataFieldWithLabel required={edit} labelWidth={60} label="송부 여부">
            <Select
              readOnly={!edit}
              value={formik.values.isSent ? 'Y' : 'N'}
              onChange={(e) => {
                if (!edit) {
                  return;
                }
                const value = e.target.value || undefined;
                if (value === 'Y') {
                  formik.setFieldValue('isSent', true);
                }
                else {
                  formik.setFieldValue('isSent', false);
                }
              }}>
              <MenuItem value="Y">Y</MenuItem>
              <MenuItem value="N">N</MenuItem>
            </Select>
          </DataFieldWithLabel>
        </Box>
        <Box sx={{ width: '100%', marginLeft: '10px', marginBottom: '15px' }}>
          <DataFieldWithLabel label="송부일" labelPosition="left">
            <DatePicker
              readOnly={!edit}
              openTo="year"
              inputFormat="YYYY-MM-DD"
              mask="____-__-__"
              value={formik.values.sentDate ? dayjs(formik.values.sentDate)
              .format('YYYY-MM-DD') : null}
              onChange={(e,
                         r
              ) => {
                const value = e ? dayjs(e)
                .format('YYYY-MM-DD') : undefined;
                const error = !value || !isValidDate(value);
                if (value) {
                  if (error) {
                    openSnackbar('올바르지 않은 날짜 형식입니다.');
                  }
                  else {
                    formik.setFieldValue('sentDate', value);
                  }
                }
              }}
              renderInput={renderDateInput}
            />
          </DataFieldWithLabel>
        </Box>
      </Box>
      <Box sx={{ width: '100%', marginBottom: '15px' }}>
        <DataFieldWithLabel required={edit} labelWidth={60} label="송신처">
          <Input
            key={formik.values.recipient}
            readOnly={!edit}
            defaultValue={formik.values.recipient ?? ''}
            onBlur={(e) => {
              if (!edit) {
                return;
              }
              const value = e.target.value || undefined;
              if (formik.values.recipient !== value) {
                formik.setFieldValue('recipient', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{ width: '100%', marginBottom: '15px' }}>
        <DataFieldWithLabel labelWidth={60} label="비고">
          <Input
            key={formik.values.note}
            readOnly={!edit}
            defaultValue={formik.values.note ?? ''}
            onBlur={(e) => {
              if (!edit) {
                return;
              }
              const value = e.target.value || undefined;
              if (formik.values.note !== value) {
                formik.setFieldValue('note', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </Box>
    </Box>
  );
}

function isValidDate(strDate: string) {
  return strDate && ((dayjs(strDate, 'YYYY-MM-DD', true)
  .isValid()));
}

function renderDateInput(parameter: TextFieldProps) {
  const value = parameter.inputProps?.value;
  const error = value != '' && !isValidDate(value);
  return (
    <Input
      {...parameter.InputProps}
      inputRef={parameter.inputRef}
      variant="standard"
      inputProps={parameter.inputProps}
      error={error}
    />
  );
}
