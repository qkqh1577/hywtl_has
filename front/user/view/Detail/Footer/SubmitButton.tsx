import React from 'react';
import { Button } from '@mui/material';
import { useFormikContext } from 'formik';
import { UserVO } from 'user/domain/user';

export default function () {

  const { handleSubmit, isSubmitting } = useFormikContext<UserVO>();

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