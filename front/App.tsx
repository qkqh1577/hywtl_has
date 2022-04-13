import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Badge,
  Box,
  Container,
  CssBaseline,
  Divider,
  IconButton, Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material';

import { AppBar, AppDrawer } from 'layouts';
import { menuData } from 'layouts/AppMenu';
import { routes as ReactRouter } from 'common';
import useUser from 'services/user/hook';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { userState: { login }, getLogin, logout } = useUser();
  const [reloaded, setReloaded] = useState<boolean>(true);

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handler = {
    logout: () => {
      if (window.confirm('로그아웃하시겠습니까?')) {
        logout();
        navigate('/login');
        return null;
      }
    }
  };

  useEffect(() => {
    getLogin();
  }, [path]);

  useEffect(() => {
    if (!login) {
      if (reloaded) {
        setReloaded(false);
      } else {
        navigate('/login', { state: { path: location.pathname } });
      }
    }
  }, [reloaded, login]);


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h3"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
          </Typography>
          {login && (
            <>
              <Typography
                component={Link}
                noWrap
                sx={{
                  color: 'inherit',
                  cursor: 'pointer',
                  p: '10px',
                }}
                onClick={() => {
                  console.log(login);
                }}
              >
                {login.name} 님
              </Typography>
              <Typography
                component={Link}
                noWrap
                sx={{
                  color: 'inherit',
                  cursor: 'pointer',
                  p: '10px',
                }}
                onClick={handler.logout}
              >
                로그아웃
              </Typography>
            </>
          )}
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <AppDrawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <div>
            {menuData.map(menu => {
              return (<ListItem key={menu.path} button onClick={() => {
                navigate(menu.path);
              }}>
                <ListItemIcon>
                  {React.createElement(menu.icon)}
                </ListItemIcon>
                <ListItemText primary={menu.name} />
              </ListItem>);
            })}
          </div>
        </List>
      </AppDrawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <ReactRouter />
        </Container>
      </Box>
    </Box>
  );
};

export default App;