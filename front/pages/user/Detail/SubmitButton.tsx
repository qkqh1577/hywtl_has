import { Button } from '@mui/material';
import React from 'react';
import { useFormikContext } from 'formik';

export default function UserDetailSubmitButton() {

  const { dirty, handleSubmit, isSubmitting } = useFormikContext();

  return (
    <Button
      disabled={!dirty && isSubmitting}
      onClick={() => {
        handleSubmit();
      }}>
      저장
    </Button>
  );
};