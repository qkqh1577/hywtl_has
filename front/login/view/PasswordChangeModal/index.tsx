import React from 'react';
import ModalLayout from 'layouts/ModalLayout';
import { DefaultFunction } from 'type/Function';
import Footer from 'login/view/PasswordChangeModal/Footer';
import Form from 'login/view/PasswordChangeModal/Form';
import { PasswordValidation } from 'login/parameter';

interface Props {
  open: boolean;
  onClose: DefaultFunction;
  passwordValidation?: PasswordValidation;
}

function PasswordChangeModal({
                               open,
                               onClose,
                               passwordValidation
                             }: Props) {
  return (
    <ModalLayout
      title="비밀번호 변경"
      width="30vw"
      open={open}
      onClose={onClose}
      children={
        <Form
          passwordValidation={passwordValidation}
        />
      }
      footer={
        <Footer
          onClose={onClose}
        />
      }
    />
  );
}

export default PasswordChangeModal;
