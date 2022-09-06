import { IconButton } from '@mui/material';
import { AccountCircle as AccountIcon } from '@mui/icons-material';
import Tooltip from 'components/Tooltip';
import React from 'react';
import useLogin from 'app/service/loginHook';
import { OnLoginUserEditModalOpen } from 'app/route/app';

interface Props {
  onLoginUserEditModalOpen: OnLoginUserEditModalOpen;
}

export default function ({onLoginUserEditModalOpen}: Props) {

  const { user } = useLogin();

  return (
    <Tooltip title="계정 정보" placement="bottom">
      <IconButton
        color="info"
        onClick={() => {
          if (user) {
            onLoginUserEditModalOpen(user);
          }
        }}>
        <AccountIcon />
      </IconButton>
    </Tooltip>
  );
}
