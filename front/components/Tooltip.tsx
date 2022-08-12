import React from 'react';
import {
  Tooltip as MuiTooltip,
  TooltipProps
} from '@mui/material';

interface Props
  extends Omit<TooltipProps, |'title'> {
  title?: string;
}

const Tooltip = ({
                   title,
                   placement = 'bottom',
                   children,
                   ...props
                 }: Props) => {
  if (title) {
    return (
      <MuiTooltip title={title} placement={placement} {...props}>
        <div>
          {children}
        </div>
      </MuiTooltip>
    );
  }
  return children;
};


export default Tooltip;
