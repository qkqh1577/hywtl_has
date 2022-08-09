import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { FormikContext } from 'formik';

export default function () {

  const formikContext = useContext(FormikContext);
  if (formikContext) {
    const { isSubmitting, handleSubmit } = formikContext;
    return (
      <Button
        children="검색"
        disabled={isSubmitting}
        onClick={() => {
          handleSubmit();
        }}
      />
    );
  }
  else {
    return (
      <Button
        children="검색"
      />
    );
  }

}