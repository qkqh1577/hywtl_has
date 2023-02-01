import React from 'react';
import ModalLayout from 'layouts/ModalLayout';
import { DefaultFunction } from 'type/Function';
import LoginForm from 'login/view/LoginModal/LoginForm';

interface Props {
  open: boolean;
  onClose: DefaultFunction;
}
export default function LoginModal(props: Props) {
  return (
    <ModalLayout
      title={'로그인'}
      width="35vw"
      open={props.open}
      children={
        <LoginForm onClose={props.onClose}/>
      } />
  );
}
