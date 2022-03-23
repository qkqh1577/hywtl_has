import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Provider} from 'react-redux';
import ReactRouter from "routes/routes";

import store from 'common/store';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import {createTheme, ThemeProvider} from '@mui/material/styles';

import AppBar from 'layouts/AppBar';
import AppDrawer from './layouts/AppDrawer';
import {menuData} from 'layouts/AppMenu';
import {ListItem, ListItemIcon, ListItemText} from "@mui/material";

const App = () => {

  const navigate = useNavigate();
  const mdTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  });

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    console.warn('use effect');
  }, []);

  console.debug(menuData);

  return (
    <Provider store={store}>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{display: 'flex'}}>
          <CssBaseline/>
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
                  ...(open && {display: 'none'}),
                }}
              >
                <MenuIcon/>
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{flexGrow: 1}}
              >
                Dashboard
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon/>
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
                <ChevronLeftIcon/>
              </IconButton>
            </Toolbar>
            <Divider/>
            <List>
              <div>
                {menuData.map(menu => {
                  return (<ListItem key={menu.path} button onClick={() => {
                    navigate(menu.path);
                  }}>
                    <ListItemIcon>
                      {React.createElement(menu.icon)}
                    </ListItemIcon>
                    <ListItemText primary={menu.name}/>
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
            <Toolbar/>
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
              <ReactRouter></ReactRouter>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;