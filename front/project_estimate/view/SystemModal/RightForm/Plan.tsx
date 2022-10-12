import React, {
  useContext,
  useState
} from 'react';
import { FormikContext } from 'formik';
import { ProjectEstimatePlanParameter } from 'project_estimate/parameter';
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
  const [plan, setPlan] = useState<Partial<ProjectEstimatePlanParameter>>({});

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
            value={plan?.estimateDate ? dayjs(plan?.estimateDate)
            .format('YYYY-MM-DD') : null}
            inputFormat="YYYY-MM-DD"
            mask="____-__-__"
            openTo="month"
            onChange={(e) => {
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
                value={parameter.value}
                inputProps={parameter.inputProps}
              />
            )}
          />
        </DataFieldWithLabel>
      </Box>
      <Box>
        <DataFieldWithLabel label="착수 가능일" labelPosition="top" required={edit}>
          <DatePicker
            value={plan?.expectedServiceDate ? dayjs(plan?.expectedServiceDate)
            .format('YYYY-MM-DD') : null}
            inputFormat="YYYY-MM-DD"
            mask="____-__-__"
            openTo="month"
            onChange={(e) => {
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
                value={parameter.value}
                inputProps={parameter.inputProps}
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
            type="number"
            disabled={!edit}
            value={plan.expectedTestDeadline ?? ''}
            onChange={(e) => {
              const value = +(e.target.value) || undefined;
              if (plan.expectedTestDeadline !== value) {
                setPlan({ ...formik.values.plan, expectedTestDeadline: value });
              }
            }}
            onBlur={() => {
              formik.setFieldValue('plan', plan);
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
            type="number"
            disabled={!edit}
            value={plan.expectedFinalReportDeadline ?? ''}
            onChange={(e) => {
              const value = +(e.target.value) || undefined;
              if (plan.expectedFinalReportDeadline !== value) {
                setPlan({ ...formik.values.plan, expectedFinalReportDeadline: value });
              }
            }}
            onBlur={() => {
              formik.setFieldValue('plan', plan);
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