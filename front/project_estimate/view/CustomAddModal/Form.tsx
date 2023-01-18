import {
  Box,
  MenuItem,
  TextFieldProps,
} from '@mui/material';
import React, {
  useCallback,
  useContext
} from 'react';
import BusinessSelector from 'components/BusinessSelector';
import UploadField from 'components/UploadField';
import { FormikContext } from 'formik';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Select from 'layouts/Select';
import Input from 'layouts/Input';
import { fileToView } from 'file-item';
import FileUploadText from 'components/FileUploadText';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import {
  snackbarAction,
  SnackbarSeverityType
} from 'components/Snackbar/action';

export default function () {
  const formik = useContext(FormikContext);
  const dispatch = useDispatch();
  const openSnackbar = useCallback((message,
                                    severity: SnackbarSeverityType = SnackbarSeverityType.warning
  ) => {
    dispatch(snackbarAction.show({ message, severity }));
  }, [dispatch]);
  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      flexWrap:       'wrap',
      justifyContent: 'space-between',
      '& > div':      {
        display:      'flex',
        flexWrap:     'nowrap',
        marginBottom: '15px',
      }
    }}>
      <Box sx={{ width: '45%' }}>
        <DataFieldWithLabel required label="송부 여부" labelPosition="top">
          <Select
            displayEmpty
            value={formik.values.isSent ? 'Y' : 'N'}
            onChange={(e) => {
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
      <Box sx={{ width: '45%' }}>
        <DataFieldWithLabel label="송부일" labelPosition="top">
          <DatePicker
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
      <Box sx={{ width: '45%' }}>
        <DataFieldWithLabel required label="송신처" labelPosition="top">
          <Input
            key={formik.values.recipient}
            defaultValue={formik.values.recipient ?? ''}
            onBlur={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.recipient !== value) {
                formik.setFieldValue('recipient', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{ width: '45%' }}>
        <DataFieldWithLabel required label="견적 업체" labelPosition="top">
          <BusinessSelector
            allowMyBusiness
            value={formik.values.businessId ?? formik.values.business?.id}
            onChange={(business) => {
              formik.setFieldValue('businessId', business.id);
            }}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{ width: '100%' }}>
        <DataFieldWithLabel label="비고" labelPosition="top">
          <Input
            key={formik.values.note}
            defaultValue={formik.values.note ?? ''}
            onBlur={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.note !== value) {
                formik.setFieldValue('note', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{ width: '100%' }}>
        <DataFieldWithLabel required label="파일" labelPosition="top">
          <UploadField
            disableDownload
            value={formik.values.file}
            onChange={(e) => {
              if (!e.target || !e.target.files || e.target.files.length === 0) {
                formik.setFieldValue('file', undefined);
                return;
              }
              formik.setFieldValue('file', fileToView(e.target.files![0]));
            }}
          />
        </DataFieldWithLabel>
      </Box>
      <FileUploadText />
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
