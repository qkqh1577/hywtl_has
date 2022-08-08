import React from 'react';
import { Button } from '@mui/material';
import useDialog from 'components/Dialog';
import { useNavigate } from 'react-router-dom';
import { useFormikContext } from 'formik';
import { UserVO } from 'user/domain/user';

export default function () {

  const { isSubmitting } = useFormikContext<UserVO>();
  const { rollback } = useDialog();
  const navigate = useNavigate();
  const onClick = () => {
    rollback(() => {
      navigate('/user');
    });
  };
  return (
    <Button
      color="secondary"
      children="취소"
      onClick={onClick}
      disabled={isSubmitting}
    />
  );
}