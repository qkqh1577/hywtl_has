import React from 'react';
import {
  Box,
} from '@mui/material';
import { LogoutButtonProps } from 'app/view/App/LogoutButton';
import MenuDrawer, { MenuDrawerProps } from 'app/view/App/MenuDrawer';
import ProjectDrawer, { ProjectDrawerProps } from 'app/view/App/ProjectDrawer';
import AppBar from 'app/view/App/Bar';
import ReactRouter from 'services/routes';

interface Props {
  isLoginPage: boolean;
  isProjectPage: boolean;
  logoutButtonProps: LogoutButtonProps;
  menuDrawerProps: MenuDrawerProps;
  projectDrawerProps: ProjectDrawerProps;
}

export default function App(props: Props) {
  const {
          isLoginPage,
          isProjectPage,
          logoutButtonProps,
          menuDrawerProps,
          projectDrawerProps
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
            isProjectPage={isProjectPage}
            logoutButtonProps={logoutButtonProps}
            projectDrawerProps={projectDrawerProps}
            menuDrawerProps={menuDrawerProps}
          />
          <MenuDrawer {...props.menuDrawerProps} />
          {isProjectPage && (<ProjectDrawer {...props.projectDrawerProps} />)}
        </>
      )}
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
                             theme.palette.mode === 'light'
                               ? theme.palette.grey[100]
                               : theme.palette.grey[900],
          flexGrow:        1,
          height:          '100vh',
          overflow:        'auto',
          paddingLeft:     0,
          paddingRight:    0,
          paddingTop:      !isLoginPage ? '64px' : 0,
        }}>
        <ReactRouter />
      </Box>
    </Box>
  );
}
