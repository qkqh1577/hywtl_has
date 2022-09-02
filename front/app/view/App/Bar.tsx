import {
  AppBar as MuiAppBar,
  Box
} from '@mui/material';
import SearchBar from 'app/view/App/SearchBar';
import NotificationButton from 'app/view/App/NotificationButton';
import AccountButton from 'app/view/App/AccountButton';
import LogoutButton, { LogoutButtonProps } from 'app/view/App/LogoutButton';
import React from 'react';
import MenuAppBar from 'app/view/App/MenuDrawer/AppBar';
import { MenuDrawerProps } from 'app/view/App/MenuDrawer';
import { ColorPalette } from 'app/view/App/theme';
import { OnLoginUserEditModalOpen } from 'app/route/app';

interface Props {
  projectAppBar: React.ReactNode;
  logoutButtonProps: LogoutButtonProps;
  menuDrawerProps: MenuDrawerProps;
  loginUserEditModal: React.ReactNode;
  onLoginUserEditModalOpen: OnLoginUserEditModalOpen;
}

export default function AppBar(props: Props) {
  const {
          logoutButtonProps,
          menuDrawerProps,
          loginUserEditModal,
          onLoginUserEditModalOpen
        } = props;
  return (
    <>
      <MuiAppBar sx={(theme) => ({
        zIndex:          theme.zIndex.drawer + 1,
        width:           '100%',
        height:          '50px',
        display:         'flex',
        padding:         0,
        flexWrap:        'nowrap',
        backgroundColor: ColorPalette.DarkBlue[2]
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
            <MenuAppBar {...menuDrawerProps} />
            {props.projectAppBar}
          </Box>
          <Box sx={{
            display: 'flex',
            height:  '100%',
          }}>
            <SearchBar />
            <NotificationButton />
            <AccountButton onLoginUserEditModalOpen={onLoginUserEditModalOpen}/>
            <LogoutButton {...logoutButtonProps} />
          </Box>
        </Box>
      </MuiAppBar>
      {loginUserEditModal}
    </>
  );
}
