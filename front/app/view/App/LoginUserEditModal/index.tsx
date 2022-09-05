import React from 'react';
import ModalLayout, { ModalLayoutProps } from 'layouts/ModalLayout';
import { Box } from '@mui/material';
import { FormikProvider } from 'formik';
import { FormikLayoutProps } from 'layouts/PageLayout';
import Form from 'app/view/App/LoginUserEditModal/Form';
import LoginUserEditModalButtonBlock from 'app/view/App/LoginUserEditModal/LoginUserEditModalButtonBlock';
import { UserShortVO } from 'user/domain';

export interface LoginUserEditModalProps
  extends FormikLayoutProps<UserShortVO> {
  open: boolean;
  onClose: ModalLayoutProps['onClose'];
}

export default function LoginUserEditModal(props: LoginUserEditModalProps) {
  const {
          open,
          onClose,
          formik
        } = props;

  const onSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <ModalLayout
      open={open}
      title="계정 수정"
      onClose={onClose}
      width="40vw"
      children={
        <Box sx={{
          display:   'flex',
          width:     '100%',
          flexWrap:  'wrap',
        }}>
          <FormikProvider value={formik}>
            <Form />
          </FormikProvider>
        </Box>
      }
      footer={
        <LoginUserEditModalButtonBlock
          onClose={onClose}
          onSubmit={onSubmit}
        />
      }
    />
  );
};