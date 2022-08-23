import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import React, { useMemo } from 'react';
import Fade from 'components/Fade';

interface Props {
  openedWidth?: number;
  closedWidth?: number;
  open: boolean;
  children: React.ReactNode;
  direction?: 'left' | 'right';
}

export default function Drawer(props: Props) {

  const AppDrawer = useMemo(() => styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position:   'relative',
        right:      props.direction === 'right' ? 0 : 'inherit',
        whiteSpace: 'nowrap',
        width:      `${props.openedWidth ?? 260}px`,
        paddingTop: '64px',
        transition: theme.transitions.create('width', {
          easing:   theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing:  'border-box',
        ...(!open && {
          overflowX:  'hidden',
          transition: theme.transitions.create('width', {
            easing:   theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width:      `${props.closedWidth ?? 0}px`
        }),
      },
    }),
  ), [props.openedWidth, props.closedWidth]);

  return (
    <AppDrawer variant="permanent" open={props.open}>
      <Fade in={props.open} timeout={{
        enter: 0,
      }}>
        {props.children}
      </Fade>
    </AppDrawer>
  );
}