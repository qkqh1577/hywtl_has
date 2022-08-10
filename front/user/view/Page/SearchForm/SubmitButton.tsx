import { Button } from '@mui/material';
import React, { useContext } from 'react';
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
      children="검색"
      disabled={formikContext?.isSubmitting}
      onClick={onClick}
    />
  );
}