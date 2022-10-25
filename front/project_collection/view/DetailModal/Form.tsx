import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import { Box } from '@mui/material';
import TextBox from 'layouts/Text';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';

export default function () {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;

  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'wrap',
      width:    '100%',
      margin:   '10px 0px',
      padding:  '10px',
    }}>
      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '100%',
        justifyContent: 'space-between',
        alignItems:     'center',
      }}>
        <TextBox variant="body7">학력 정보</TextBox>
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
          <DataFieldWithLabel required={edit} label="기성명" labelPosition="top">
            <Input
              readOnly={!edit}
              key={formik.values.name}
              defaultValue={formik.values.name ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
                const value = e.target.value || undefined;
                if (formik.values.name !== value) {
                  formik.setFieldValue('name', value);
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
      </Box>
    </Box>
  );
}