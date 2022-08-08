import React from 'react';
import { Button } from '@mui/material';
import { useFormikContext } from 'formik';
import { UserVO } from 'user/domain/user';

export interface PasswordResetButtonProps {
  handlePassword: () => void;
}

export default function ({
                           handlePassword
                         }: PasswordResetButtonProps) {
  const { values } = useFormikContext<UserVO>();

  return (
    <Button
      children="비밀번호 변경"
      onClick={handlePassword}
      disabled={typeof values.id === 'undefined'}
    />
  );
}