import { Button } from '@mui/material';
import React, { useContext } from 'react';
import {
  FormikContext,
} from 'formik';
import {
  initialUserQuery,
} from 'user/parameter/query';

export default function () {

  const formikContext = useContext(FormikContext);

  const onClick = () => {
    if (formikContext) {
      const { resetForm, setValues } = formikContext;
      resetForm();
      setValues(initialUserQuery);
    }
  };
  return (
    <Button
      color="secondary"
      onClick={onClick}
      children="초기화"
    />
  );
}