import { Box } from '@mui/material';
import React, { useContext } from 'react';
import Input from 'layouts/Input';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import { FormikContext } from 'formik';
import { toAmount } from 'util/NumberUtil';
import BusinessSelector from 'components/BusinessSelector';

export default function ProjectStatusFailReasonAddModalForm() {
  const formik = useContext(FormikContext);
  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      flexWrap:       'wrap',
      justifyContent: 'space-between',
      marginBottom:   '10px',
      alignItems:     'flex-start'
    }}>
      <Box sx={{
        display:      'flex',
        width:        '100%',
        flexWrap:     'nowrap',
        marginBottom: '10px',
      }}>
        <DataFieldWithLabel required label="수주업체" labelPosition="top">
          <BusinessSelector
            value={formik.values.winId}
            onChange={(business) => {
              if (formik.values.winId !== business.id) {
                formik.setFieldValue('winId', business.id);
              }
            }}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{
        width:        'calc(100% / 5)',
        display:      'flex',
        flexWrap:     'nowrap',
        marginBottom: '10px',
      }}>
        <DataFieldWithLabel required label="풍동 금액" labelPosition="top">
          <Input
            isAmount
            key={formik.values.testAmount}
            defaultValue={formik.values.testAmount?.toLocaleString() ?? ''}
            onBlur={(e) => {
              const value = toAmount(e.target.value) || undefined;
              if (formik.values.testAmount !== value) {
                formik.setFieldValue('testAmount', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{
        width:        'calc(100% / 5)',
        display:      'flex',
        flexWrap:     'nowrap',
        marginBottom: '10px',
      }}>
        <DataFieldWithLabel required label="구검" labelPosition="top">
          <Input
            isAmount
            key={formik.values.reviewAmount}
            defaultValue={formik.values.reviewAmount?.toLocaleString() ?? ''}
            onBlur={(e) => {
              const value = toAmount(e.target.value) || undefined;
              if (formik.values.reviewAmount !== value) {
                formik.setFieldValue('reviewAmount', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{
        width:        'calc(100% / 5)',
        display:      'flex',
        flexWrap:     'nowrap',
        marginBottom: '10px',
      }}>
        <DataFieldWithLabel required label="총액" labelPosition="top">
          <Input
            isAmount
            key={formik.values.totalAmount}
            defaultValue={formik.values.totalAmount?.toLocaleString() ?? ''}
            onBlur={(e) => {
              const value = toAmount(e.target.value) || undefined;
              if (formik.values.totalAmount !== value) {
                formik.setFieldValue('totalAmount', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{
        width:        'calc(100% / 5)',
        display:      'flex',
        flexWrap:     'nowrap',
        marginBottom: '10px',
      }}>
        <DataFieldWithLabel required label="일정" labelPosition="top">
          <Input
            key={formik.values.expectedDuration}
            defaultValue={formik.values.expectedDuration ?? ''}
            onBlur={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.expectedDuration !== value) {
                formik.setFieldValue('expectedDuration', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{
        display:      'flex',
        width:        '100%',
        flexWrap:     'nowrap',
        marginBottom: '10px',
      }}>
        <DataFieldWithLabel required label="원인" labelPosition="top">
          <Input
            multiline
            key={formik.values.reason}
            defaultValue={formik.values.reason ?? ''}
            onBlur={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.reason !== value) {
                formik.setFieldValue('reason', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </Box>
    </Box>
  );
}
