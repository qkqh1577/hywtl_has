import Tooltip from 'components/Tooltip';
import { IconButton } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import React from 'react';

export interface LogoutButtonProps {
  handleLogout: () => void;
}

export default function ({ handleLogout }: LogoutButtonProps) {

  return (
    <Tooltip title="로그아웃" placement="bottom">
      <IconButton color="info" onClick={handleLogout}>
        <LogoutIcon />
      </IconButton>
    </Tooltip>
  );
}