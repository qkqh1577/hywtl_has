import React, { useContext } from 'react';
import {
  FormikContext,
  FormikContextType,
} from 'formik';
import { UserVO } from 'user/domain/user';
import TextField from 'components/TextField';
import { FieldStatus } from 'components/DataFieldProps';

export default function () {

  const formikContext: FormikContextType<UserVO> = useContext(FormikContext);
  if (formikContext) {
    const { values } = formikContext;
    return (
      <TextField
        required
        name="username"
        label="아이디"
        status={typeof values.id === 'undefined' ? FieldStatus.Idle : FieldStatus.Disabled}
      />
    );
  }
  else {
    return (
      <TextField
        required
        name="username"
        label="아이디"
      />
    );
  }

}