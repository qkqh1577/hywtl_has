import useDialog from 'components/Dialog';
import Tooltip from 'components/Tooltip';
import { IconButton } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import React from 'react';
import useLogin from 'App/service/loginHook';

export default function () {

  const { logout } = useLogin();

  const { confirm } = useDialog();
  const onClick = () => {
    confirm({
      children:     '로그아웃하시겠습니까?',
      confirmText:  '로그아웃',
      afterConfirm: () => {
        logout();
      }
    });
  };

  return (
    <Tooltip title="로그아웃" placement="bottom">
      <IconButton color="info" onClick={onClick}>
        <LogoutIcon />
      </IconButton>
    </Tooltip>
  );
}