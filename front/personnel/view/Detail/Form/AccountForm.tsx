import React, { useContext } from 'react';
import { Box, } from '@mui/material';
import TextBox from 'layouts/Text';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import { FormikContext } from 'formik';

export default function AccountForm() {
  const formik = useContext(FormikContext);
  const values = formik.values ?? {};
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
        <TextBox variant="body7">계정 정보</TextBox>
      </Box>
      <Box sx={{
        display:        'flex',
        flexWrap:       'wrap',
        width:          '80%',
        justifyContent: 'flex-start',
        alignItems:     'flex-start'
      }}>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '100%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="이름">
            <Input
              readOnly
              key={values.name}
              defaultValue={values.name ?? ''}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '100%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="이메일">
            <Input
              readOnly
              key={values.email}
              defaultValue={values.email ?? ''}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:  'flex',
          flexWrap: 'nowrap',
          width:    '100%',
        }}>
          <DataFieldWithLabel label="상태">
            <Input
              readOnly
              key={values.userStatus}
              defaultValue={values.userStatus ?? ''}
            />
          </DataFieldWithLabel>
        </Box>
      </Box>
    </Box>
  );
}
