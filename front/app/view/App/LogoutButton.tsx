import Tooltip from 'components/Tooltip';
import { IconButton } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import React from 'react';
import useDialog from 'components/Dialog';

export interface LogoutButtonProps {
  handleLogout: () => void;
}

export default function ({ handleLogout }: LogoutButtonProps) {

  const { confirm } = useDialog();
  const onClick = () => {
    confirm({
      children:     '로그아웃하시겠습니까?',
      confirmText:  '로그아웃',
      afterConfirm: handleLogout
    });
  };

  return (
    <Tooltip title="로그아웃" placement="bottom">
      <IconButton color="info" onClick={onClick}>
        <LogoutIcon />
      </IconButton>
    </Tooltip>
  );
};