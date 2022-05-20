import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  Input,
  InputAdornment,
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
  FolderOpen as FolderOpenIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { Formik, FormikHelpers } from 'formik';
import Tree, { TreeNode } from 'rc-tree';
import { NodeDragEventParams } from 'rc-tree/lib/contextTypes';
import { EventDataNode, Key } from 'rc-tree/lib/interface';

import logo from 'assets/logo.png';
import { AppBar, AppDrawer } from 'layouts';
import { Alert, Confirm, Tooltip, useDialog } from 'components';
import { routes as ReactRouter } from 'services/common';
import { useUser } from 'services/user';
import { ProjectDrawer, ProjectList } from 'pages/project';
import { ProjectCommentDrawer, ProjectCommentList } from 'pages/project/comment';

type Menu = {
  title: string;
  path: string;
  icon: typeof SvgIcon;
  children?: Menu[];
}

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dialog = useDialog();
  const { state: { login }, getLogin, logout } = useUser();
  const path = location.pathname;

  const [openMenu, setOpenMenu] = useState(true);
  const [openProject, setOpenProject] = useState(true);
  const [openComment, setOpenComment] = useState(false);
  const [menuData, setMenuData] = useState<Menu[]>([
    {
      title: '프로젝트 관리',
      path: '/project',
      icon: FolderOpenIcon
    },
    {
      title: '영업 관리',
      path: '/sales',
      icon: FolderOpenIcon
    },
    {
      title: '인사카드 관리',
      path: '/hr/card',
      icon: FolderOpenIcon
    },
    {
      title: '부서 관리',
      path: '/department',
      icon: FolderOpenIcon
    },
    {
      title: '사용자 관리',
      path: '/user',
      icon: FolderOpenIcon
    }, {
      title: '업체 관리',
      path: '/business-management',
      icon: FolderOpenIcon
    }
  ]);

  const handler = {
    toggleMenu: () => {
      setOpenMenu(!openMenu);
    },
    toggleProject: () => {
      setOpenProject(!openProject);
    },
    toggleComment: () => {
      setOpenComment(!openComment);
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

      setMenuData(data.map(menu => ({ ...menu, icon: FolderOpenIcon })));
    },
    logout: () => {
      dialog.confirm({
        children: '로그아웃하시겠습니까?',
        confirmText: '로그아웃',
        afterConfirm: () => {
          logout();
          navigate('/login');
        }
      });
    },
    search: (values: any, { setSubmitting }: FormikHelpers<any>) => {
      console.log(values);
      setSubmitting(false);
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

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="transparent"
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
                <img src={logo} width="auto" height="26" alt="한양풍동실험연구소_로고" />
              </Grid>
            </Grid>
            {login && (
              <Grid item
                sx={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                  justifyContent: 'flex-end',
                }}>
                <Formik
                  initialValues={{
                    search: ''
                  }}
                  onSubmit={handler.search}
                >
                  {({ setFieldValue }) => (
                    <Input
                      placeholder="통합검색"
                      onChange={(e) => {
                        setFieldValue('search', e.target.value);
                      }}
                      sx={{
                        width: '240px',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        border: '1px solid #44527b',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                      endAdornment={
                        <InputAdornment
                          position="end"
                          sx={{
                            color: '#717ea8',
                          }}
                        >
                          <SearchIcon />
                        </InputAdornment>
                      }
                    />
                  )}
                </Formik>
                <Tooltip title="알림" placement="bottom">
                  <IconButton color="warning">
                    <NotificationsIcon />
                    <Typography color="white">
                      4
                    </Typography>
                  </IconButton>
                </Tooltip>
                <Tooltip title="계정 정보" placement="bottom">
                  <IconButton
                    color="info"
                    onClick={() => {
                      console.log(login);
                    }}
                  >
                    <AccountIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="로그아웃" placement="bottom">
                  <IconButton
                    color="info"
                    onClick={handler.logout}
                  >
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
          </Toolbar>
        </AppBar>
        <AppDrawer variant="permanent" open={openMenu}>
          <Toolbar />
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
            <Toolbar />
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
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <Toolbar sx={{
            paddingLeft: 0,
            paddingRight: 0,
          }} />
          <ReactRouter />
        </Box>
        <Routes>
          <Route path="/project/:id/*" element={
            <ProjectCommentDrawer variant="permanent" open={openComment}>
              <Toolbar />
              <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  px: [1],
                }}
              >
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
                    onClick={handler.toggleComment}
                  >
                    {openComment ? <RightIcon /> : <LeftIcon />}
                  </IconButton>
                </Box>
                {openComment && (
                  <Typography
                    color="primary"
                    sx={{
                      ml: '19px',
                      fontSize: '16px'
                    }}
                  >
                    메모
                  </Typography>
                )}
              </Toolbar>
              <Divider />
              {openComment && <ProjectCommentList />}
            </ProjectCommentDrawer>
          } />
        </Routes>
      </Box>
      <Alert />
      <Confirm />
    </>
  );
};

export default App;
