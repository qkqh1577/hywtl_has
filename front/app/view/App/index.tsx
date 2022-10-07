import React from 'react';
import { Box, } from '@mui/material';
import ReactRouter from 'services/routes';
import { useLocation } from 'react-router-dom';

interface Props {
  appBar: React.ReactNode;
  menuDrawer: React.ReactNode;
  projectDrawer: React.ReactNode;
  projectMemoDrawer: React.ReactNode;
  projectAddModal: React.ReactNode;
  loginChangeModal: React.ReactNode;
  userNotificationModal: React.ReactNode;
}

export default function App(props: Props) {

  const { pathname } = useLocation();
  const isLoginPage = pathname.startsWith('/login');
  return (
    <>
      <Box sx={{
        display:  'flex',
        width:    '100%',
        height:   '100vh',
        overflow: 'hidden'
      }}>
        {props.appBar}
        {props.menuDrawer}
        {props.projectDrawer}
        <Box
          component="main"
          sx={{
            flexGrow:     1,
            height:       '100vh',
            overflow:     'hidden',
            paddingLeft:  0,
            paddingRight: 0,
            paddingTop:   !isLoginPage ? '50px' : 0,
          }}>
          <ReactRouter />
        </Box>
        {props.projectMemoDrawer}
      </Box>
      {props.loginChangeModal}
      {props.userNotificationModal}
      {props.projectAddModal}
    </>
  );
}
