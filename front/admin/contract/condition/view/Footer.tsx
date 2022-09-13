import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import Button from 'layouts/Button';

export default function Footer(props) {
  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      justifyContent: 'center',
      alignItems:     'center',
      flexDirection:  'column',
      marginTop:      '30px',
    }}>
      <Box>
        <Button
          shape="basic1"
          onClick={() => {
            props.onSubmit();
          }}
          sx={{
            marginRight: '10px',
          }}>
          저장
        </Button>
      </Box>
      <Box sx={{
        marginTop: '15px',
      }}>
        <Typography sx={{
          color:      '#9b9ea4',
          fontWeight: 'bold'
        }} variant="body2">
          &#183; 내용 변경 후, 저장 하지 않고 페이지를 이동 할 경우 변경입력된 내용은 반영되지 않습니다.
        </Typography>
      </Box>
    </Box>
  );
}
