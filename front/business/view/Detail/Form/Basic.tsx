import React from 'react';
import { Box } from '@mui/material';
import TextField from 'components/TextField';
import TextBox from 'layouts/Text';

interface Props {
  checkButton: React.ReactNode;
}

export default function BusinessBasicSection(props: Props) {
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
        <TextBox variant="body7">업체 정보</TextBox>
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
          width:        '80%',
          marginBottom: '15px',
        }}>
          <TextField
            required
            name="name"
            label="업체명"
          />
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <TextField
            name="ceoName"
            label="대표명"
          />
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <TextField
            required
            name="registrationNumber"
            label="사업자번호"
            endAdornment={props.checkButton}
          />
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <TextField
            name="officePhone"
            label="대표 전화번호"
          />
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <TextField
            name="fax"
            label="팩스번호"
          />
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <TextField
            name="address"
            label="주소"
          />
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <TextField
            name="zipCode"
            label="우편번호"
          />
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <TextField
            name="note"
            label="비고"
          />
        </Box>
      </Box>
    </Box>
  );
};
