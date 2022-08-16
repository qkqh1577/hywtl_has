import { IconButton } from '@mui/material';
import { AccountCircle as AccountIcon } from '@mui/icons-material';
import Tooltip from 'components/Tooltip';
import React from 'react';
import useLogin from 'app/service/loginHook';

export default function () {

  const { user } = useLogin();

  return (
    <Tooltip title="계정 정보" placement="bottom">
      <IconButton
        color="info"
        onClick={() => {
          console.log(user);
        }}>
        <AccountIcon />
      </IconButton>
    </Tooltip>
  );
}