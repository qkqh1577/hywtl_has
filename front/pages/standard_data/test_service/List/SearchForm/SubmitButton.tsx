import { Button } from '@mui/material';
import React from 'react';
import { useFormikContext } from 'formik';

export default function TestServiceListSubmitButton() {

  const { isSubmitting, handleSubmit } = useFormikContext();
  return (
    <Button
      disabled={isSubmitting}
      children="검색"
      onClick={() => {
        handleSubmit();
      }}
    />
  );
}