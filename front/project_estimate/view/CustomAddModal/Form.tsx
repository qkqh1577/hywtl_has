import {
  Box,
  MenuItem
} from '@mui/material';
import React, { useContext } from 'react';
import BusinessSelector from 'components/BusinessSelector';
import UploadField from 'components/UploadField';
import { FormikContext } from 'formik';
import DataFieldWithLabel from 'components/DataFieldLabel';
import Select from 'layouts/Select';
import Input from 'layouts/Input';

export default function () {
  const formik = useContext(FormikContext);
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
      <Box sx={{
        width:       '45%',
        marginRight: '50%',
      }}>
        <DataFieldWithLabel required label="송부 여부" labelPosition="top">
          <Select
            displayEmpty
            defaultValue=""
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (value === 'Y') {
                formik.setFieldValue('isSent', true);
              }
              else if (value === 'N') {
                formik.setFieldValue('isSent', false);
              }
              else {
                formik.setFieldValue('isSent', undefined);
              }
            }}>
            <MenuItem value="">선택</MenuItem>
            <MenuItem value="Y">Y</MenuItem>
            <MenuItem value="N">N</MenuItem>
          </Select>
        </DataFieldWithLabel>
      </Box>
      <Box sx={{ width: '45%' }}>
        <DataFieldWithLabel required label="송신처" labelPosition="top">
          <Input
            defaultValue=""
            onChange={(e) => {
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
            onChange={(id) => {
              formik.setFieldValue('businessId', id);
            }}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{ width: '90%' }}>
        <DataFieldWithLabel label="비고" labelPosition="top">
          <Input
            defaultValue=""
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.note !== value) {
                formik.setFieldValue('note', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{ width: '90%' }}>
        <DataFieldWithLabel required label="파일" labelPosition="top">
          <UploadField
            required
            disableLabel
            name="file"
            label="파일"
          />
        </DataFieldWithLabel>
      </Box>
    </Box>
  );
}