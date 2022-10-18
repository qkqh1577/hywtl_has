import {
  Box,
  InputAdornment
} from '@mui/material';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import dayjs from 'dayjs';
import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import TextBox from 'layouts/Text';
import { ColorPalette } from 'app/view/App/theme';

export default function () {

  const formik = useContext(FormikContext);
  const plan = formik.values.estimate?.plan ?? {};

  return (
    <Box sx={{
      width:          '100%',
      padding:        '10px',
      display:        'flex',
      flexWrap:       'wrap',
      justifyContent: 'space-between',
      border:         `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius:   '5px',
      '& > div':      {
        width:        '45%',
        marginBottom: '15px',
      }
    }}>
      <Box>
        <DataFieldWithLabel label="견적 일자" labelPosition="top">
          <Input
            readOnly
            key={plan.estimateDate}
            defaultValue={plan.estimateDate ? dayjs(plan.estimateDate)
            .format('YYYY-MM-DD') : ''}
          />
        </DataFieldWithLabel>
      </Box>
      <Box>
        <DataFieldWithLabel label="착수 가능일" labelPosition="top">
          <Input
            readOnly
            key={plan.expectedServiceDate}
            defaultValue={plan.expectedServiceDate ? dayjs(plan.expectedServiceDate)
            .format('YYYY-MM-DD') : ''}
          />
        </DataFieldWithLabel>
      </Box>
      <Box>
        <DataFieldWithLabel label="설풍 납품 가능 주" labelPosition="top">
          <Input
            readOnly
            type="number"
            key={plan.expectedTestDeadline}
            defaultValue={plan.expectedTestDeadline ?? ''}
            endAdornment={
              <InputAdornment position="end">
                <TextBox variant="body12">주</TextBox>
              </InputAdornment>
            }
          />
        </DataFieldWithLabel>
      </Box>
      <Box>
        <DataFieldWithLabel label="최종 보고서 납품 가능 주" labelPosition="top">
          <Input
            readOnly
            type="number"
            key={plan.expectedFinalReportDeadline}
            defaultValue={plan.expectedFinalReportDeadline ?? ''}
            endAdornment={
              <InputAdornment position="end">
                <TextBox variant="body12">주</TextBox>
              </InputAdornment>
            }
          />
        </DataFieldWithLabel>
      </Box>
      <Box>
        <DataFieldWithLabel label="풍동 금액" labelPosition="top">
          <Input
            readOnly
            isAmount
            key={plan.testAmount}
            defaultValue={plan.testAmount?.toLocaleString() ?? ''}
          />
        </DataFieldWithLabel>
      </Box>
      <Box>
        <DataFieldWithLabel label="구검" labelPosition="top">
          <Input
            readOnly
            isAmount
            key={plan.reviewAmount}
            defaultValue={plan.reviewAmount?.toLocaleString() ?? ''}
          />
        </DataFieldWithLabel>
      </Box>
    </Box>
  );
}