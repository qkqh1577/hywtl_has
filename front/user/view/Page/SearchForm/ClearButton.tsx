import { Button } from '@mui/material';
import React from 'react';
import { useFormikContext } from 'formik';
import {
  initialUserQuery,
  UserQuery
} from 'user/parameter/query';

export default function () {

  const { resetForm, setValues } = useFormikContext<UserQuery>();

  const onClick = () => {
    resetForm();
    setValues(initialUserQuery);
  };
  return (
    <Button
      color="secondary"
      onClick={onClick}
      children="초기화"
    />
  );
}