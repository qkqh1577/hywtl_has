import {
  AppBar as MuiAppBar,
  Box
} from '@mui/material';
import SearchBar from 'app/view/App/SearchBar';
import React from 'react';
import { ColorPalette } from 'app/view/App/theme';

interface Props {
  projectAppBar: React.ReactNode;
  logoutButton: React.ReactNode;
  menuDrawerBar: React.ReactNode;
  accountButton: React.ReactNode;
  notificationButton: React.ReactNode;
}

export default function AppBar(props: Props) {
  return (
    <>
      <MuiAppBar sx={(theme) => ({
        zIndex:          theme.zIndex.drawer + 1,
        width:           '100%',
        height:          '50px',
        display:         'flex',
        padding:         0,
        flexWrap:        'nowrap',
        backgroundColor: ColorPalette._242e43
      })}>
        <Box sx={{
          display:        'flex',
          height:         '100%',
          width:          '100%',
          justifyContent: 'space-between',
        }}>
          <Box sx={{
            display: 'flex',
            height:  '100%',
          }}>
            {props.menuDrawerBar}
            {props.projectAppBar}
          </Box>
          <Box sx={{
            display:     'flex',
            height:      '100%',
            flexWrap:    'nowrap',
            alignItems:  'center',
            marginRight: '10px',
          }}>
            <SearchBar />
            {props.notificationButton}
            {props.accountButton}
            {props.logoutButton}
          </Box>
        </Box>
      </MuiAppBar>
    </>
  );
}
