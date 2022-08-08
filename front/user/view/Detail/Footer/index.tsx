import React from 'react';
import CancelButton from 'user/view/Detail/Footer/CancelButton';
import { Box } from '@mui/material';
import SubmitButton from 'user/view/Detail/Footer/SubmitButton';
import PasswordResetButton, { PasswordResetButtonProps } from 'user/view/Detail/Footer/PasswordResetButton';

export interface FooterProps
  extends PasswordResetButtonProps {
}

export default function (props: FooterProps) {

  return (
    <Box sx={{
      display:        'flex',
      justifyContent: 'flex-end',
      width:          '100%',
      mt:             '40px',
    }}>
      <CancelButton />
      <SubmitButton />
      <PasswordResetButton {...props} />
    </Box>
  );
}