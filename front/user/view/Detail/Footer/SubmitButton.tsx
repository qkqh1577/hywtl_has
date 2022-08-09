import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { FormikContext } from 'formik';

export default function () {
  const formikContext = useContext(FormikContext);
  if (formikContext) {
    const { handleSubmit, isSubmitting } = formikContext;

    const onClick = () => {
      handleSubmit();
    };
    return (
      <Button
        children="저장"
        onClick={onClick}
        disabled={isSubmitting}
      />
    );
  }
  else {
    return (
      <Button
        children="저장"
      />
    );
  }
}