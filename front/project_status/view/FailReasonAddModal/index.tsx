import React from 'react';
import ModalLayout from 'layouts/ModalLayout';
import DetailFormFooter from 'layouts/DetailFormFooter';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { FormikProvider } from 'formik';
import { DefaultFunction } from 'type/Function';
import Form from './Form';

interface Props
  extends FormikLayoutProps<any> {
  onClose: DefaultFunction;
  open: boolean;
}

export default function ProjectStatusFailReasonAddModal(props: Props) {
  const { formik, onClose, open } = props;

  return (
    <ModalLayout
      width="30vw"
      open={open}
      title="수주실패 원인 입력"
      onClose={onClose}
      children={
        <FormikProvider value={formik}>
          <Form />
        </FormikProvider>
      }
      footer={
        <DetailFormFooter
          onSubmit={() => {
            formik.handleSubmit();
          }}
          onClose={onClose}
        />
      }
    />
  );
}
