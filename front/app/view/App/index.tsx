import React from 'react';
import {
  Box,
  Button,
  CssBaseline,
} from '@mui/material';
import { AppBar } from 'layouts';
import ReactRouter from 'services/routes';
import {
  Alert,
  Confirm
} from 'components/Dialog';
import { ThemeProvider } from '@mui/styles';
import mainTheme from 'app/view/App/theme';
import LogoutButton, { LogoutButtonProps } from 'app/view/App/LogoutButton';
import SearchBar from 'app/view/App/SearchBar';
import NotificationButton from 'app/view/App/NotificationButton';
import AccountButton from 'app/view/App/AccountButton';
import MenuDrawer, { MenuDrawerProps } from 'app/view/App/MenuDrawer';
import logo from 'assets/logo.png';
import ProjectDrawer, { ProjectDrawerProps } from 'app/view/App/ProjectDrawer';
import IconButton from 'components/IconButton';
import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon
} from '@mui/icons-material';

interface Props {
  isLoginPage: boolean;
  isProjectPage: boolean;
  loginButtonProps: LogoutButtonProps;
  menuDrawerProps: MenuDrawerProps;
  projectDrawerProps: ProjectDrawerProps;
}

export default function App(props: Props) {
  const {
          isLoginPage,
          isProjectPage
        } = props;

  return (
    <ThemeProvider theme={mainTheme}>
      <Box sx={{
        display: 'flex',
        width:   '100%',
        height:  '100vh'
      }}>
        <CssBaseline />
        {!isLoginPage && (
          <>
            <AppBar color="transparent">
              <Box sx={{
                top:             0,
                position:        'absolute',
                width:           '100%',
                height:          '56px',
                backgroundColor: '#3c3757',
                display:         'flex',
                justifyContent:  'space-between',
              }}>
                <Box sx={{
                  display: 'flex',
                }}>
                  <Box sx={{
                    width:          '260px',
                    padding:        '12px 4px',
                    display:        'flex',
                    flexWrap:       'wrap',
                    justifyContent: 'space-between',
                    alignContent:   'flex-end',
                    borderRight:    '1px solid rgb(245, 245, 245)'
                  }}>
                    <img src={logo} width="auto" height="30px" alt="한양풍동실험연구소_로고" />
                    <Box sx={{
                      display:         'flex',
                      justifyContent:  'center',
                      alignContent:    'center',
                      alignItems:      'center',
                      width:           '36px',
                      height:          '30px',
                      backgroundColor: '#c4baf5',
                      borderRadius:    '4px'
                    }}>
                      <IconButton
                        tooltip={'메인 메뉴 ' + (props.menuDrawerProps.openMenu ? '접기' : '펴기')}
                        onClick={props.menuDrawerProps.toggleMenu}
                        children={props.menuDrawerProps.openMenu ? <LeftIcon /> : <RightIcon />}
                      />
                    </Box>
                  </Box>
                  {isProjectPage && (
                    <Box sx={{
                      width:          '340px',
                      padding:        '12px 4px',
                      display:        'flex',
                      flexWrap:       'wrap',
                      justifyContent: 'space-between',
                      alignContent:   'flex-end',
                      borderRight:    '1px solid rgb(245, 245, 245)'
                    }}>
                      <Button>신규 프로젝트 등록</Button>
                      <IconButton
                        tooltip={'프로젝트 메뉴 ' + (props.projectDrawerProps.openMenu ? '접기' : '펴기')}
                        onClick={props.projectDrawerProps.toggleMenu}
                        children={props.menuDrawerProps.openMenu ? <LeftIcon /> : <RightIcon />}
                      />
                    </Box>
                  )}
                </Box>
                <Box sx={{
                  display:         'flex',
                  backgroundColor: '#3c3757',
                }}>
                  <SearchBar />
                  <NotificationButton />
                  <AccountButton />
                  <LogoutButton {...props.loginButtonProps} />
                </Box>
              </Box>
            </AppBar>
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
      <Alert />
      <Confirm />
    </ThemeProvider>
  );
}
