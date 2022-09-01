import {
  Box,
  Button
} from '@mui/material';
import React, { useContext } from 'react';
import { FormikContext } from 'formik';

interface Props {
  onClose: () => void;
}

export default function ProjectDocumentUpdateModalButtonBlock(props: Props) {

  const formikContext = useContext(FormikContext);

  const onSubmit = () => {
    formikContext?.handleSubmit();
  };
  return (
    <Box sx={{
      display:        'flex',
      height:         '30px',
      width:          '100%',
      justifyContent: 'center',
    }}>
      <Button onClick={onSubmit}>저장</Button>
      <Button onClick={props.onClose}>취소</Button>
    </Box>
  );
};
