import React from 'react';
import { useFormikContext } from 'formik';
import { UserVO } from 'user/domain/user';
import TextField from 'components/TextField';
import { FieldStatus } from 'components/DataFieldProps';

export default function () {

  const { values } = useFormikContext<UserVO>();

  return (
    <TextField
      required
      name="username"
      label="아이디"
      status={typeof values.id === 'undefined' ? FieldStatus.Idle : FieldStatus.Disabled}
    />
  );
}