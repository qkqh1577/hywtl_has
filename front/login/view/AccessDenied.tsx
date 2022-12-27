import React from 'react';
import {
  Box,
  Button
} from '@mui/material';
import TextBox from 'layouts/Text';
import { useNavigate } from 'react-router-dom';

function AccessDenied(props) {
  const navigate = useNavigate()
  return (
    <Box sx={{
      display:       'flex',
      width:         '100%',
      height:        '50%',
      alignItems:    'center',
      flexWrap:      'wrap',
      flexDirection: 'column',
      marginTop:     '40vh',
    }}>
      <Box sx={{
        display:        'flex',
        alignItems:     'center',
        flexDirection:  'column',
        flexWrap:       'nowrap',
        width:          '25%',
        marginBottom:   '40px',
        border:         '1px solid #e0e0e0',
        padding:        '20px',
      }}>
        <TextBox variant="heading1">
          해당 링크는 유효하지 않습니다.
        </TextBox>
      </Box>
      <Box sx={{
        width: '25%',
      }}>
        <Button
          sx={{
            width:     '100%',
            marginTop: '10px'
          }}
          onClick={() => {
            navigate('/login');
          }}>
          로그인으로 돌아가기
        </Button>
      </Box>
      <Box sx={{
        display:        'flex',
        justifyContent: 'flex-end',
        marginTop:      '10px'
      }}>
      </Box>
    </Box>
  );
}

export default AccessDenied;
