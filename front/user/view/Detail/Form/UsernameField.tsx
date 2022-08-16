import React, { useContext } from 'react';
import {
  FormikContext,
  FormikContextType,
} from 'formik';
import { UserVO } from 'user/domain';
import TextField from 'components/TextField';
import { FieldStatus } from 'components/DataFieldProps';

export default function () {

  const formikContext: FormikContextType<UserVO> = useContext(FormikContext);
  return (
    <TextField
      required
      name="username"
      label="아이디"
      status={typeof formikContext?.values.id === 'undefined' ? FieldStatus.Idle : FieldStatus.Disabled}
    />
  );

}