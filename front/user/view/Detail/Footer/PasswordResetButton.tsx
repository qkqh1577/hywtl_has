import React, { useContext } from 'react';
import { Button } from '@mui/material';
import {
  FormikContext,
  FormikContextType,
} from 'formik';
import { UserVO } from 'user/domain';

export interface PasswordResetButtonProps {
  handlePassword: () => void;
}

export default function ({
                           handlePassword
                         }: PasswordResetButtonProps) {
  const formikContext: FormikContextType<UserVO> = useContext(FormikContext);
  if (formikContext) {
    const { values } = formikContext;
    if (!values.id) {
      return null;
    }
    return (
      <Button
        children="비밀번호 변경"
        onClick={handlePassword}
        disabled={typeof values.id === 'undefined'}
      />
    );
  }
  else {
    return null;
  }

}