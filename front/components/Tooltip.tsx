import React from 'react';
import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material';

const Tooltip = ({
  title,
  placement = 'bottom',
  children,
  ...props
}: TooltipProps) => (
  <MuiTooltip title={title} placement={placement} {...props}>
    <div>
      {children}
    </div>
  </MuiTooltip>
);

export default Tooltip;
