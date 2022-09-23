import {
  IconButton,
  Typography
} from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import Tooltip from 'components/Tooltip';
import React from 'react';
import { DefaultFunction } from 'type/Function';

interface Props {
  count: number;
  onClick: DefaultFunction;
}

export default function (props: Props) {

  return (
    <Tooltip title="알림" placement="bottom">
      <IconButton color="warning" onClick={props.onClick}>
        <NotificationsIcon />
        <Typography color="white" children={props.count} />
      </IconButton>
    </Tooltip>
  );
}