import React from 'react';
import { Box, } from '@mui/material';
import { LogoutButtonProps } from 'app/view/App/LogoutButton';
import MenuDrawer, { MenuDrawerProps } from 'app/view/App/MenuDrawer';
import AppBar from 'app/view/App/Bar';
import ReactRouter from 'services/routes';
import { OnLoginUserEditModalOpen, } from 'app/route/app';

interface Props {
  isLoginPage: boolean;
  isProjectPage: boolean;
  logoutButtonProps: LogoutButtonProps;
  menuDrawerProps: MenuDrawerProps;
  projectDrawer: React.ReactNode;
  projectMemoDrawer: React.ReactNode;
  projectAppBar: React.ReactNode;
  loginUserEditModal: React.ReactNode;
  onLoginUserEditModalOpen: OnLoginUserEditModalOpen;
  notificationButton: React.ReactNode;
  userNotificationModal: React.ReactNode;
}

export default function App(props: Props) {
  const {
          isLoginPage,
          isProjectPage,
          logoutButtonProps,
          menuDrawerProps,
        } = props;

  return (
    <Box sx={{
      display: 'flex',
      width:   '100%',
      height:  '100vh'
    }}>
      {!isLoginPage && (
        <>
          <AppBar
            projectAppBar={props.projectAppBar}
            logoutButtonProps={logoutButtonProps}
            menuDrawerProps={menuDrawerProps}
            loginUserEditModal={props.loginUserEditModal}
            onLoginUserEditModalOpen={props.onLoginUserEditModalOpen}
            notificationButton={props.notificationButton}
            userNotificationModal={props.userNotificationModal}
          />
          <MenuDrawer {...props.menuDrawerProps} />
          {props.projectDrawer}
        </>
      )}
      <Box
        component="main"
        sx={{
          flexGrow:     1,
          height:       '100vh',
          overflow:     'auto',
          paddingLeft:  0,
          paddingRight: 0,
          paddingTop:   !isLoginPage ? '50px' : 0,
        }}>
        <ReactRouter />
      </Box>
      {isProjectPage && props.projectMemoDrawer}
    </Box>
  );
}
