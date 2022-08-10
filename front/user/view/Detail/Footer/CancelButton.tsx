import React, { useContext } from 'react';
import { Button } from '@mui/material';
import useDialog from 'components/Dialog';
import { useNavigate } from 'react-router-dom';
import { FormikContext } from 'formik';

export default function () {

  const formikContext = useContext(FormikContext);
  const { rollback } = useDialog();
  const navigate = useNavigate();
  const onClick = () => {
    if (formikContext) {
      rollback(() => {
        navigate('/user');
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