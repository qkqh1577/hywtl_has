import React from 'react';
import ModalLayout, { ModalLayoutProps } from 'layouts/ModalLayout';
import { FormikLayoutProps } from 'layouts/PageLayout';
import {
  UserNotificationId,
  UserNotificationVO
} from 'user_notification/domain';
import { Box } from '@mui/material';
import { FormikProvider } from 'formik';
import List from 'user_notification/view/List';

export interface UserNotificationModalProps
  extends FormikLayoutProps<UserNotificationVO> {
  open: boolean;
  onClose: ModalLayoutProps['onClose'];
  list: UserNotificationVO[] | undefined;
  onDelete: (id: UserNotificationId) => void;
  onRead: (id: UserNotificationId) => void;
}

export default function UserNotificationModal(props: UserNotificationModalProps) {
  const {
          open,
          onClose,
          formik,
          list,
          onDelete,
          onRead,
        } = props;
  return (
    <ModalLayout
      title="알림"
      width="30vw"
      open={open}
      onClose={onClose}
      children={
        <Box sx={{
          display:  'flex',
          width:    '100%',
          flexWrap: 'wrap',
        }}>
          <FormikProvider value={formik}>
            <List
              list={list}
              onDelete={onDelete}
              onRead={onRead}
            />
          </FormikProvider>
        </Box>
      } />
  );
}
