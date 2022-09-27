import { Box } from '@mui/material';
import SelectField from 'components/SelectField';
import React from 'react';
import { FormikLayoutProps } from 'layouts/PageLayout';
import TextField from 'components/TextField';
import BusinessSelector from 'components/BusinessSelector';
import UploadField from 'components/UploadField';


export default function (props: FormikLayoutProps<any>) {
  const { formik } = props;
  return (
    <Box sx={{
      width:    '100%',
      display:  'flex',
      flexWrap: 'wrap',
    }}>
      <Box sx={{
        width:        '100%',
        paddingRight: '50%',
        display:      'flex',
        flexWrap:     'nowrap',
      }}>
        <SelectField
          required
          name="isSentSelect"
          label="송부 여부"
          labelPosition="top"
          options={['Y', 'N']}
          onChange={(e) => {
            const value = e.target.value;
            if (value === 'Y') {
              formik.setFieldValue('isSent', true);
            }
            else {
              formik.setFieldValue('isSent', false);
            }
          }}
        />
      </Box>
      <Box sx={{
        width:    '50%',
        display:  'flex',
        flexWrap: 'nowrap',
      }}>
        <TextField
          name="recipient"
          label="송신처"
          labelPosition="top"
        />
      </Box>
      <Box sx={{
        width:    '50%',
        display:  'flex',
        flexWrap: 'nowrap',
      }}>
        <BusinessSelector
          required
          allowMyBusiness
          name="business"
          label="견적 업체"
          labelPosition="top"
        />
      </Box>
      <Box sx={{
        width:    '100%',
        display:  'flex',
        flexWrap: 'nowrap',
      }}>
        <TextField
          name="note"
          label="비고"
          labelPosition="top"
        />
      </Box>
      <Box sx={{
        width:    '100%',
        display:  'flex',
        flexWrap: 'nowrap',
      }}>
        <UploadField
          name="file"
          label="파일"
          labelPosition="top"
        />
      </Box>
    </Box>
  );
}