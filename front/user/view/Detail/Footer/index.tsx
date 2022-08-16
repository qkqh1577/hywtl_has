import React from 'react';
import PasswordResetButton, { PasswordResetButtonProps } from 'user/view/Detail/Footer/PasswordResetButton';
import DetailFormFooter from 'layouts/DetailFormFooter';

export interface FooterProps
  extends PasswordResetButtonProps {
}

export default function (props: FooterProps) {

  return (
    <DetailFormFooter
      right={<PasswordResetButton {...props} />}
    />
  );
}