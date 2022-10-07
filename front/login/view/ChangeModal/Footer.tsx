import { Box } from '@mui/material';
import Button from 'layouts/Button';
import React, { useContext } from 'react';
import { DefaultFunction } from 'type/Function';
import { FormikContext } from 'formik';

interface Props {
  onClose: DefaultFunction;
  onResetPassword: DefaultFunction;
}

export default function (props: Props) {

  const formik = useContext(FormikContext);
  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      flexWrap:       'nowrap',
      justifyContent: 'space-between',
      alignItems:     'center',
    }}>
      <Box sx={{
        display:        'flex',
        justifyContent: 'flex-start',
        flexWrap:       'nowrap'
      }}>
        <Button
          onClick={() => {
            formik.handleSubmit();
          }}
          sx={{
            marginRight: '10px',
          }}>
          계정정보 변경
        </Button>
        <Button
          onClick={props.onClose}
          sx={{
            marginRight: '10px',
          }}>
          취소
        </Button>
      </Box>
      <Box sx={{
        display:        'flex',
        justifyContent: 'flex-end',
        flexWrap:       'nowrap',
      }}>
        <Button shape="basic3" onClick={props.onResetPassword}>
          비밀번호 변경
        </Button>
      </Box>
    </Box>
  );
}