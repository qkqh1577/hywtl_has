import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Badge,
  Box,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Toolbar,
  Typography
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  ChevronLeft as ChevronLeftIcon,
  FlightSharp as FlightSharpIcon,
  FlightTakeoffSharp as FlightTakeoffSharpIcon,
  FlightLandSharp as FlightLandSharpIcon
} from '@mui/icons-material';
import Tree, { TreeNode } from 'rc-tree';

import { AppBar, AppDrawer } from 'layouts';
import { routes as ReactRouter } from 'common';
import useUser from 'services/user/hook';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { NodeDragEventParams } from 'rc-tree/lib/contextTypes';
import { EventDataNode, Key } from 'rc-tree/lib/interface';

type Menu = {
  title: string;
  path: string;
  icon: typeof SvgIcon;
  children?: Menu[];
}

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { userState: { login }, getLogin, logout } = useUser();
  const [reloaded, setReloaded] = useState<boolean>(true);

  const [open, setOpen] = useState(true);
  const [menuData, setMenuData] = useState<Menu[]>([
    {
      title: 'Department',
      path: '/department',
      icon: DashboardIcon
    }, {
      title: 'User',
      path: '/user',
      icon: DashboardIcon
    }, {
      title: 'HR',
      path: '/hr/card',
      icon: DashboardIcon
    }, {
      title: 'SALES',
      path: '/sales',
      icon: DashboardIcon
    }, {
      title: 'PROJECT',
      path: '/project',
      icon: DashboardIcon
    }
  ]);

  const handler = {
    toggle: () => {
      setOpen(!open);
    },
    dragStart: (info: NodeDragEventParams) => {
      console.log(info);
      setMenuData(menuData.map((menu) => {
        if (info.node.key as string === menu.path) {
          return {
            ...menu,
            icon: FlightTakeoffSharpIcon
          };
        }
        return menu;
      }));
    },
    dragEnter: (info: NodeDragEventParams & {
      expandedKeys: Key[];
    }) => {
      console.log(info);
    },
    drop: (info: NodeDragEventParams & {
      dragNode: EventDataNode;
      dragNodesKeys: Key[];
      dropPosition: number;
      dropToGap: boolean;
    }) => {
      const dropKey = info.node.key as string;
      const dragKey = info.dragNode.key as string;
      const dropPos = info.node.pos.split('-');
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

      const loop = (data: Menu[], path: string, callback: (item: Menu, index: number, arr: Menu[]) => void) => {
        data.forEach((item, index, arr) => {
          if (item.path === path) {
            callback(item, index, arr);
            return;
          }
        });
      };
      const data: Menu[] = [...menuData];

      // Find dragObject
      let dragObj: Menu | undefined;
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });
      if (dragObj) {
        // Drop on the gap (insert before or insert after)
        let ar: Menu[] | undefined;
        let i: number | undefined;
        loop(data, dropKey, (item, index, arr) => {
          ar = arr;
          i = index;
        });
        if (ar && typeof i === 'number') {
          if (dropPosition === -1) {
            ar.splice(i, 0, dragObj);
          } else {
            ar.splice(i + 1, 0, dragObj);
          }
        }
      }

      setMenuData(data.map(menu => ({ ...menu, icon: DashboardIcon })));
    },
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
            onClick={handler.toggle}
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
          <IconButton onClick={handler.toggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Tree
          onDragStart={handler.dragStart}
          onDragEnter={handler.dragEnter}
          onDrop={handler.drop}
          onSelect={(selectedKeys) => {
            const path: string = selectedKeys[0] as string;
            navigate(path);
          }}
          draggable
          defaultExpandAll
          virtual={false}
        >
          {menuData.map((menu) => (
            <TreeNode
              title={
                <ListItem key={menu.path} button>
                  <ListItemIcon>
                    {React.createElement(menu.icon)}
                  </ListItemIcon>
                  <ListItemText primary={menu.title} />
                </ListItem>
              }
              key={menu.path}
              checkable={false}
            />

          ))}
        </Tree>
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
