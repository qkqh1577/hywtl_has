import React from 'react';
import ModalLayout, { ModalLayoutProps } from 'layouts/ModalLayout';
import {
  UserNotificationId,
  UserNotificationVO,
} from 'user_notification/domain';
import { Box } from '@mui/material';
import List from 'user_notification/view/List';

export interface UserNotificationModalProps {
  open: boolean;
  list: UserNotificationVO[] | undefined;
  onClose: ModalLayoutProps['onClose'];
  onDelete: (id: UserNotificationId) => void;
  onRead: (id: UserNotificationId) => void;
  onDeleteAll: () => void;
  onReadAll: () => void;
}

export default function UserNotificationModal(props: UserNotificationModalProps) {
  const {
          open,
          list,
          onClose,
          onDelete,
          onRead,
          onDeleteAll,
          onReadAll,
        } = props;
  return (
    <ModalLayout
      title="알림"
      width="40vw"
      open={open}
      onClose={onClose}
      children={
        <Box sx={{
          display:  'flex',
          width:    '100%',
          flexWrap: 'wrap',
        }}>
          <List
            list={list}
            onDelete={onDelete}
            onRead={onRead}
            onDeleteAll={onDeleteAll}
            onReadAll={onReadAll}
            onClose={onClose}
          />
        </Box>
      } />
  );
}
