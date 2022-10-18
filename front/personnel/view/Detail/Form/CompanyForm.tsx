import React, { useContext } from 'react';
import {
  Box,
  MenuItem
} from '@mui/material';
import { FormikContext } from 'formik';
import { hiredTypeList } from 'personnel/domain';
import TextBox from 'layouts/Text';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Select from 'layouts/Select';
import Input from 'layouts/Input';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function CompanyForm() {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const values = formik.values.company ?? {};
  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'nowrap',
      width:    '100%',
      margin:   '10px 0px',
      padding:  '10px',
    }}>
      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '13%',
        justifyContent: 'flex-start',
        alignItems:     'flex-start'
      }}>
        <TextBox variant="body7">입사 정보</TextBox>
      </Box>
      <Box sx={{
        display:        'flex',
        flexWrap:       'wrap',
        width:          '80%',
        justifyContent: 'space-between',
        alignItems:     'flex-start'
      }}>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel required={edit} label="입사일">
            <DatePicker
              openTo="year"
              inputFormat="YYYY-MM-DD"
              mask="____-__-__"
              disabled={!edit}
              value={values.hiredDate ? dayjs(values.hiredDate)
              .format('YYYY-MM-DD') : null}
              onChange={(e) => {
                const value = e ? dayjs(e)
                .format('YYYY-MM-DD') : undefined;
                const formikValue = values.hiredDate ? dayjs(values.hiredDate)
                .format('YYYY-MM-DD') : undefined;
                if (formikValue !== value) {
                  formik.setFieldValue('company.hiredDate', value);
                }
              }}
              renderInput={(parameter) => (
                <Input
                  {...parameter.InputProps}
                  inputRef={parameter.inputRef}
                  variant="standard"
                  value={parameter.value}
                  inputProps={parameter.inputProps}
                />
              )}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel required={edit} label="입사 구분">
            <Select
              disabled={!edit}
              value={values.hiredType ?? ''}
              onChange={(e) => {
                const value = e.target.value || undefined;
                if (values.hiredType !== value) {
                  formik.setFieldValue('company.hiredType', value);
                }
              }}>
              {hiredTypeList.map(item => (
                <MenuItem key={item} value={item as string}>{item}</MenuItem>
              ))}
            </Select>
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
          marginRight:  '47%',
        }}>
          <DataFieldWithLabel label="추천자">
            <Input
              disabled={!edit}
              defaultValue={values.recommender ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (values.phone !== value) {
                  formik.setFieldValue('company.recommender', value);
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
      </Box>
    </Box>
  );
}
