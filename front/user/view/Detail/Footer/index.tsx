import React from 'react';
import PasswordResetButton from 'user/view/Detail/Footer/PasswordResetButton';
import DetailFormFooter from 'layouts/DetailFormFooter';
import { DefaultFunction } from 'type/Function';

export interface FooterProps {
  onCancel: DefaultFunction;
  onPasswordChange: DefaultFunction;
}

export default function (props: FooterProps) {

  return (
    <DetailFormFooter
      right={<PasswordResetButton {...props} />}
    />
  );
}