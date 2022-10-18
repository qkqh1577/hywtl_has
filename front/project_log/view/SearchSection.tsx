import React, { useContext } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Typography,
} from '@mui/material';
import { FormikContext } from 'formik';
import { ColorPalette } from 'app/view/App/theme';
import Select from 'layouts/Select';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Input from 'layouts/Input';

interface Props {
  totalElements: number;
}

function SubmitButton() {

  const formikContext = useContext(FormikContext);
  const onClick = () => {
    if (formikContext) {
      const { handleSubmit } = formikContext;
      handleSubmit();
    }
  };

  return (
    <Button
      children="검색"
      disabled={formikContext?.isSubmitting}
      onClick={onClick}
    />
  );
}

export default function ({ totalElements }: Props) {
  const formik = useContext(FormikContext);

  const tabNameList = [
    '기본 정보',
    '단지 정보',
    '견적/계약',
    '진행 정보',
    '자료',
    '일정',
    '이력'
  ];

  return (

    <Box sx={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'flex-end',
      alignItems:     'center',
    }}>
      <Typography sx={{
        fontWeight:  'bold',
        fontSize:    '12px',
        color:       ColorPalette._252627,
        marginRight: '5px'
      }}>
        {`총 ${totalElements}건`}
      </Typography>
      <Box sx={{
        marginRight: '10px'
      }}>
        <Select
          value={formik.values.tabName ?? ''}
          variant="outlined"
          onChange={(e) => {
            const value = e.target.value || undefined;
            if (formik.values.tabName !== value) {
              formik.setFieldValue('tabName', value);
            }
          }}>
          {tabNameList.map(item => (
            <MenuItem key={item} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{
        marginRight: '10px'
      }}>
        <DatePicker
          value={formik.values.createdAt ? dayjs(formik.values.createdAt)
          .format('YYYY-MM-DD') : null}
          inputFormat="YYYY-MM-DD"
          mask="____-__-__"
          openTo="day"
          onChange={(e) => {
            if (e === null) {
              formik.setFieldValue('createdAt', undefined);
            }
            else {
              formik.setFieldValue('createdAt', dayjs(e)
              .format('YYYY-MM-DD'));
            }
          }}
          renderInput={(parameter) => (
            <Input
              {...parameter.InputProps}
              inputRef={parameter.inputRef}
              variant="outlined"
              value={parameter.value}
              inputProps={parameter.inputProps}
            />
          )}
        />
      </Box>
      <Box sx={{
        width:       '40%',
        marginRight: '10px'
      }}>
        <Input
          key={formik.values.keyword}
          defaultValue={formik.values.keyword ?? ''}
          placeholder="ID 검색"
          onBlur={(e) => {
            const value = e.target.value || undefined;
            if (formik.values.keyword !== value) {
              formik.setFieldValue('keyword', value);
            }
          }}
        />
      </Box>
      <SubmitButton />
    </Box>
  );
}
