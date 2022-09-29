import React from 'react';
import { Box, } from '@mui/material';
import TextField from 'components/TextField';
import { FieldStatus } from 'components/DataFieldProps';
import TextBox from 'layouts/Text';

export default function AccountForm() {
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
          <TextField
            name="name"
            label="이름"
            status={FieldStatus.ReadOnly}
          />
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '100%',
          marginBottom: '15px',
        }}>
          <TextField
            name="email"
            label="이메일"
            status={FieldStatus.ReadOnly}
          />
        </Box>
        <Box sx={{
          display:  'flex',
          flexWrap: 'nowrap',
          width:    '100%',
        }}>
          <TextField
            name="userStatus"
            label="상태"
            status={FieldStatus.ReadOnly}
          />
        </Box>
      </Box>
    </Box>
  );
}
