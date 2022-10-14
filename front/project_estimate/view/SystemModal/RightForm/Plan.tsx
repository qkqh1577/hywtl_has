import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import {
  Box,
  InputAdornment
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import DataFieldWithLabel from 'components/DataFieldLabel';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Input from 'layouts/Input';
import TextBox from 'layouts/Text';

export default function () {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const plan = formik.values.plan;

  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      flexWrap:       'nowrap',
      border:         `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius:   '5px',
      margin:         '10px 0px',
      padding:        '10px',
      justifyContent: 'space-between',
      alignItems:     'center',
      '& > div':      {
        display:    'flex',
        alignItems: 'center',
        width:      'calc(100% / 7)',
        margin:     '10px'
      }
    }}>
      <Box>
        <DataFieldWithLabel label="견적 일자" labelPosition="top" required={edit}>
          <DatePicker
            key={plan.estimateDate}
            value={plan.estimateDate ? dayjs(plan.estimateDate)
            .format('YYYY-MM-DD') : null}
            inputFormat="YYYY-MM-DD"
            mask="____-__-__"
            openTo="year"
            onChange={(e,
                       r
            ) => {
              const date = dayjs(e);
              if (plan.estimateDate !== r) {

                if (date.isValid() && date.format('YYYY-MM-DD') === r) {
                  formik.setFieldValue('plan.estimateDate', r);
                }
                else {
                  formik.setFieldValue('plan.estimateDate', undefined);
                }
              }
            }}
            onAccept={(e) => {
              if (e === null) {
                formik.setFieldValue('plan.estimateDate', undefined);
              }
              else {
                formik.setFieldValue('plan.estimateDate', dayjs(e)
                .format('YYYY-MM-DD'));
              }
            }}
            renderInput={(parameter) => (
              <Input
                {...parameter.InputProps}
                inputRef={parameter.inputRef}
                inputProps={parameter.inputProps}
                defaultValue={parameter.value}
                onChange={undefined}
                onBlur={parameter.onChange}
              />
            )}
          />
        </DataFieldWithLabel>
      </Box>
      <Box>
        <DataFieldWithLabel label="착수 가능일" labelPosition="top" required={edit}>
          <DatePicker
            value={plan.expectedServiceDate ? dayjs(plan.expectedServiceDate)
            .format('YYYY-MM-DD') : null}
            inputFormat="YYYY-MM-DD"
            mask="____-__-__"
            openTo="year"
            onChange={(e,
                       r
            ) => {
              const date = dayjs(e);
              if (plan.expectedServiceDate !== r) {

                if (date.isValid() && date.format('YYYY-MM-DD') === r) {
                  formik.setFieldValue('plan.expectedServiceDate', r);
                }
                else {
                  formik.setFieldValue('plan.expectedServiceDate', undefined);
                }
              }
            }}
            onAccept={(e) => {
              if (e === null) {
                formik.setFieldValue('plan.expectedServiceDate', undefined);
              }
              else {
                formik.setFieldValue('plan.expectedServiceDate', dayjs(e)
                .format('YYYY-MM-DD'));
              }
            }}
            renderInput={(parameter) => (
              <Input
                {...parameter.InputProps}
                inputRef={parameter.inputRef}
                inputProps={parameter.inputProps}
                defaultValue={parameter.value}
                onChange={undefined}
                onBlur={parameter.onChange}
              />
            )}
          />
        </DataFieldWithLabel>
      </Box>
      <Box>
        <DataFieldWithLabel label="견적 담당자1" labelPosition="top" required={edit}>
          TBD
        </DataFieldWithLabel>
      </Box>
      <Box>
        <DataFieldWithLabel label="견적 담당자2" labelPosition="top" required={edit}>
          TBD
        </DataFieldWithLabel>
      </Box>
      <Box>
        <DataFieldWithLabel label="설풍 납품 가능 주" labelPosition="top" required={edit}>
          <Input
            key={plan.expectedTestDeadline}
            type="number"
            disabled={!edit}
            defaultValue={plan.expectedTestDeadline ?? ''}
            onBlur={(e) => {
              const value = +(e.target.value) || undefined;
              if (plan.expectedTestDeadline !== value) {
                formik.setFieldValue('plan.expectedTestDeadline', value);
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <TextBox variant="body12">주</TextBox>
              </InputAdornment>
            }
          />
        </DataFieldWithLabel>
      </Box>
      <Box>
        <DataFieldWithLabel label="최종 보고서 납품 가능 주" labelPosition="top" required={edit}>
          <Input
            key={plan.expectedFinalReportDeadline}
            type="number"
            disabled={!edit}
            defaultValue={plan.expectedFinalReportDeadline ?? ''}
            onBlur={(e) => {
              const value = +(e.target.value) || undefined;
              if (plan.expectedFinalReportDeadline !== value) {
                formik.setFieldValue('plan.expectedFinalReportDeadline', value);
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <TextBox variant="body12">주</TextBox>
              </InputAdornment>
            }
          />
        </DataFieldWithLabel>
      </Box>
    </Box>
  );
}