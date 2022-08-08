import { Button } from '@mui/material';
import React from 'react';
import { useFormikContext } from 'formik';
import { UserQuery } from 'user/parameter/query';

export default function () {

  const { isSubmitting, handleSubmit } = useFormikContext<UserQuery>();
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