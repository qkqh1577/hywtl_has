import {
  IconButton,
  Typography
} from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import Tooltip from 'components/Tooltip';
import React from 'react';

export default function() {

  return (
    <Tooltip title="알림" placement="bottom">
      <IconButton color="warning">
        <NotificationsIcon />
        <Typography color="white" children="4" />
      </IconButton>
    </Tooltip>
  )
}