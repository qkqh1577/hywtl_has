import React from 'react';
import ModalLayout from 'layouts/ModalLayout';
import { DefaultFunction } from 'type/Function';
import Form from 'login/view/ChangeModal/Form';
import Footer from 'login/view/ChangeModal/Footer';

interface Props {
  open: boolean;
  onResetPassword: DefaultFunction;
  onClose: DefaultFunction;
}

export default function LoginChangeModal(props: Props) {

  return (
    <ModalLayout
      open={props.open}
      title="계정 수정"
      onClose={props.onClose}
      width="35vw"
      children={<Form />}
      footer={
        <Footer
          onResetPassword={props.onResetPassword}
          onClose={props.onClose}
        />
      }
    />
  );
};
