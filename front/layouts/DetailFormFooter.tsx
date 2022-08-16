import React, { useContext } from 'react';
import {
  Box,
  Button
} from '@mui/material';
import { FormikContext } from 'formik';
import useDialog from 'components/Dialog';

function CancelButton() {

  const formikContext = useContext(FormikContext);
  const { rollback } = useDialog();
  const onClick = () => {
    if (formikContext) {
      rollback(() => {
        formikContext.handleReset();
      });
    }
  };
  return (
    <Button
      color="secondary"
      children="취소"
      onClick={onClick}
      disabled={formikContext?.isSubmitting}
    />
  );
}

function SubmitButton() {
  const formikContext = useContext(FormikContext);

  const onClick = () => {
    if (formikContext) {
      const { handleSubmit } = formikContext;
      handleSubmit();
    }
  };
  return (
    <Button
      children="저장"
      onClick={onClick}
      disabled={formikContext?.isSubmitting}
    />
  );
}

export interface DetailFormFooterProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
}

export default function DetailFormFooter(props: DetailFormFooterProps) {

  return (
    <Box sx={{
      display:        'flex',
      justifyContent: 'space-between',
      width:          '100%',
      mt:             '40px',
    }}>
      {props.children}
      {!props.children && (
        <>
          <Box sx={{
            display: 'flex',
            width:   '50%',
          }}>
            {props.left}
          </Box>
          <Box sx={{
            display:        'flex',
            justifyContent: 'flex-end',
            width:          '50%',
          }}>
            <CancelButton />
            <SubmitButton />
            {props.right}
          </Box>
        </>
      )}
    </Box>
  );
}