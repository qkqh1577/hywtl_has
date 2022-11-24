import React, { useContext } from 'react';
import { Box, } from '@mui/material';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';
import { FormikContext } from 'formik';

interface Props {
  onClose: DefaultFunction;
}

function Footer({ onClose }: Props) {
  const formik = useContext(FormikContext);
  return (
    <Box sx={{
      width:          '100%',
      margin:         '20px 0',
      display:        'flex',
      justifyContent: 'center',
      alignItems:     'center',
    }}>
      <Button
        sx={{
          marginRight: '10px',
        }}
        onClick={() => {
          formik.handleSubmit();
        }}>
        저장
      </Button>
      <Button
        shape="basic2"
        onClick={onClose}
      >
        취소
      </Button>
    </Box>
  );
}

export default Footer;
