import {
  Box,
  Divider,
  List,
  Toolbar,
  Typography
} from '@mui/material';
import Fade from 'components/Fade';
import React from 'react';
import ToggleButton from 'App/view/App/ToggleButton';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import useMenu from 'App/service/menuHook';
import MenuNode from 'App/view/App/MenuNode';

const AppDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position:   'relative',
      whiteSpace: 'nowrap',
      width:      '240px',
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
        width:      '52px'
      }),
    },
  }),
);

export default function () {

  const {
          open,
          menu,
        } = useMenu();

  return (
    <AppDrawer variant="permanent" open={open}>
      <Toolbar />
      <Toolbar sx={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: open ? 'space-between' : 'flex-end',
        px:             [1],
      }}>
        <Fade in={open}>
          <Typography sx={{
            ml:       '19px',
            fontSize: '16px'
          }}>
            업무메뉴
          </Typography>
        </Fade>
        <Box sx={{
          display:         'flex',
          justifyContent:  'center',
          alignContent:    'center',
          alignItems:      'center',
          width:           '36px',
          height:          '36px',
          backgroundColor: '#c4baf5',
          borderRadius:    '4px'
        }}>
          <ToggleButton />
        </Box>
      </Toolbar>
      <Divider />
      <Fade in={open}>
        <List component="div" sx={{
          display:  'flex',
          width:    '100%',
          flexWrap: 'wrap',
          padding:  0,
        }}>
          {menu.map((item) => (
            <MenuNode key={item.title} menu={item} />
          ))}
        </List>
      </Fade>
    </AppDrawer>
  );
}