import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { FormikContext } from 'formik';

export default function () {
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