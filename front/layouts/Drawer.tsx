import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import React, { useMemo } from 'react';
import Fade from 'components/Fade';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

interface Props {
  openedWidth?: number;
  closedWidth?: number;
  open: boolean;
  children: React.ReactNode;
  direction?: 'left' | 'right';
  padding?: string;
  sx?: SxProps<Theme>;
}

export default function Drawer(props: Props) {

  const AppDrawer = useMemo(() => styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        padding:     0,
        position:    'relative',
        right:       props.direction === 'right' ? 0 : 'inherit',
        whiteSpace:  'nowrap',
        border:      'none',
        borderLeft:  props.direction === 'right' ? '1px solid #0000001f' : 'none',
        borderRight: props.direction !== 'left' ? '1px solid #0000001f' : 'none',
        width:       `${props.openedWidth ?? 260}px`,
        paddingTop:  '50px',
        transition:  theme.transitions.create('width', {
          easing:   theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing:   'border-box',
        ...(!open && {
          overflowX:  'hidden',
          transition: theme.transitions.create('width', {
            easing:   theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width:      `${props.closedWidth ?? 0}px`
        }),
        ...(props.sx ?? {})
      },
    }),
  ), [props.openedWidth, props.closedWidth]);

  return (
    <AppDrawer variant="permanent" open={props.open} sx={props.sx}>
      <Fade
        in={props.open}
        children={props.children}
        timeout={{
          enter: 0,
        }}
      />
    </AppDrawer>
  );
}