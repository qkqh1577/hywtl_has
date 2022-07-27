import { Button } from '@mui/material';
import React from 'react';
import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';

export default function UserDetailCancelButton() {

  const { dirty } = useFormikContext();
  const navigate = useNavigate();

  return (
    <Button
      color="secondary"
      disabled={dirty}
      onClick={() => {
        navigate(-1);
      }}>
      취소
    </Button>
  );
}