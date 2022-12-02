import {
  IconButton,
  Typography
} from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import Tooltip from 'components/Tooltip';
import React from 'react';
import { DefaultFunction } from 'type/Function';
import { ColorPalette } from 'assets/theme';

interface Props {
  count: number;
  onClick: DefaultFunction;
}

export default function (props: Props) {

  return (
    <Tooltip title="알림" placement="bottom">
      <IconButton onClick={props.onClick} sx={{
        color: props.count ? ColorPalette._ffb72b : ColorPalette._2d3a54,
        '&:hover':       {
          color: props.count ? ColorPalette._ffb72b : ColorPalette._e4e9f2,
        }
      }}>
        <NotificationsIcon />
        <Typography color="white" children={props.count} />
      </IconButton>
    </Tooltip>
  );
}
