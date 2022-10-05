import React from 'react';
import { Box } from '@mui/material';
import Button from 'layouts/Button';

interface Props {
  onSubmit: () => void;
  onClose: () => void;
}

export default function LoginUserEditModalButtonBlock(props: Props){
  return(
    <Box sx={{
      display:        'flex',
      width:          '100%',
      justifyContent: 'center',
    }}>
      <Button
        onClick={props.onSubmit}
        sx={{
          marginRight: '10px',
        }}>
        계정정보 변경
      </Button>
      <Button shape="basic3" onClick={props.onClose}>
        비밀번호 변경
      </Button>
    </Box>
  )
}
