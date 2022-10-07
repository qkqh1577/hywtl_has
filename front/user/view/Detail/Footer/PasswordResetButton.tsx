import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { FormikContext } from 'formik';
import { DefaultFunction } from 'type/Function';

interface Props {
  onPasswordChange: DefaultFunction;
}

export default function ({
                           onPasswordChange
                         }: Props) {
  const formik = useContext(FormikContext);
  return (
    <Button
      children="비밀번호 변경"
      onClick={onPasswordChange}
      disabled={typeof formik.values.id === 'undefined'}
    />
  );

}