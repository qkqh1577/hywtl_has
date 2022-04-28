import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  CssBaseline,
  Divider, Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Toolbar,
  Typography
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  FlightTakeoffSharp as FlightTakeoffSharpIcon,
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { Dashboard as DashboardIcon } from '@mui/icons-material';
import Tree, { TreeNode } from 'rc-tree';
import { NodeDragEventParams } from 'rc-tree/lib/contextTypes';
import { EventDataNode, Key } from 'rc-tree/lib/interface';

import { AppBar, AppDrawer } from 'layouts';
import {
  appDrawerWidth,
  projectDrawerWidth,
  iconWidth
} from 'layouts/data';
import { ProjectDrawer, ProjectList } from 'pages/project';
import { routes as ReactRouter } from 'services/common';
import useUser from 'services/user/hook';
import logo from 'assets/logo.png';

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

  const [openMenu, setOpenMenu] = useState(true);
  const [openProject, setOpenProject] = useState(true);
  const [width, setWidth] = useState<number>(appDrawerWidth);
  const [menuData, setMenuData] = useState<Menu[]>([
    {
      title: '부서 관리',
      path: '/department',
      icon: DashboardIcon
    }, {
      title: '사용자 관리',
      path: '/user',
      icon: DashboardIcon
    }, {
      title: '인사카드 관리',
      path: '/hr/card',
      icon: DashboardIcon
    }, {
      title: '영업 관리',
      path: '/sales',
      icon: DashboardIcon
    }, {
      title: '프로젝트 관리',
      path: '/project',
      icon: DashboardIcon
    }
  ]);

  const handler = {
    toggleMenu: () => {
      setOpenMenu(!openMenu);
    },
    toggleProject: () => {
      setOpenProject(!openProject);
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
    const list: string[] = ['/login', '/user-invitations/authenticate'];
    if (!list.includes(path)) {
      localStorage.setItem('path', location.pathname);
      getLogin(() => {
        navigate('/login');
      });
    }
  }, [path]);

  useEffect(() => {
    let tempWidth: number = 0;
    tempWidth += openMenu ? appDrawerWidth : iconWidth;
    if (path.startsWith('/project')) {
      tempWidth += openProject ? projectDrawerWidth : iconWidth;
    }
    setWidth(tempWidth);
  }, [path, openMenu, openProject]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="transparent"
        width={width}
      >
        <Toolbar
          sx={{
            backgroundColor: '#3c3757'
          }}
        >
          <Grid container spacing={2} wrap="nowrap"
            sx={{
              display: 'flex',
              flexWrap: 'nowrap',
              alignContent: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Grid item>
              <img src={logo} width="auto" height="26" />
            </Grid>
          </Grid>
          {login && (
            <Grid item
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'flex-end',
              }}>
              <IconButton color="warning">
                <NotificationsIcon />
                <Typography color="white">
                  4
                </Typography>
              </IconButton>
              <IconButton
                color="info"
                onClick={() => {
                  console.log(login);
                }}
              >
                <AccountIcon />
              </IconButton>
              <IconButton
                color="info"
                onClick={handler.logout}
              >
                <LogoutIcon />
              </IconButton>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
      <AppDrawer variant="permanent" open={openMenu}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: openMenu ? 'space-between' : 'flex-end',
            px: [1],
          }}
        >
          {openMenu && (
            <Typography
              color="primary"
              sx={{
                ml: '24px',
                fontSize: '16px'
              }}
            >
              업무메뉴
            </Typography>
          )}
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            width: '36px',
            height: '36px',
            backgroundColor: '#c4baf5',
            borderRadius: '4px'
          }}>
            <IconButton
              color="primary"
              sx={{
                display: 'flex',
                width: '16.25px',
                height: '16.25px',
                backgroundColor: 'transparent',
                border: '2px solid #301a9a',
              }}
              onClick={handler.toggleMenu}
            >
              {openMenu ? <LeftIcon /> : <RightIcon />}
            </IconButton>
          </Box>
        </Toolbar>
        <Divider />
        {openMenu && (
          <Tree
            onDragStart={handler.dragStart}
            onDragEnter={handler.dragEnter}
            onDrop={handler.drop}
            draggable
            defaultExpandAll
          >
            {menuData.map((menu) => (
              <TreeNode
                title={
                  <ListItem
                    key={menu.path}
                    onClick={() => {
                      navigate(menu.path);
                    }}
                    button
                  >
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
        )}
      </AppDrawer>
      {path.startsWith('/project') && (
        <ProjectDrawer variant="permanent" open={openProject}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: openProject ? 'space-between' : 'flex-end',
              px: [1],
            }}
          >
            {openProject && (
              <Typography
                color="primary"
                sx={{
                  ml: '19px',
                  fontSize: '16px'
                }}
              >
                프로젝트 목록
              </Typography>
            )}
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              width: '36px',
              height: '36px',
              backgroundColor: '#c4baf5',
              borderRadius: '4px'
            }}>
              <IconButton
                color="primary"
                sx={{
                  display: 'flex',
                  width: '16.25px',
                  height: '16.25px',
                  backgroundColor: 'transparent',
                  border: '2px solid #301a9a',
                }}
                onClick={handler.toggleProject}
              >
                {openProject ? <LeftIcon /> : <RightIcon />}
              </IconButton>
            </Box>
          </Toolbar>
          <Divider />
          {openProject && <ProjectList />}
        </ProjectDrawer>
      )}
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
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
          <ReactRouter />
        </Container>
      </Box>

    </Box>
  );
};

export default App;
