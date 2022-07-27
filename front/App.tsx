import React, {
  useEffect,
  useState
} from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
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
  Search as SearchIcon,
  CancelPresentation as UnusableIcon,
  DoubleArrow as SelectedMenuIcon,
  Label as MenuIcon,
} from '@mui/icons-material';
import {
  Formik,
  FormikHelpers
} from 'formik';
import Tree, { TreeNode } from 'rc-tree';
import { NodeDragEventParams } from 'rc-tree/lib/contextTypes';
import {
  EventDataNode,
  Key
} from 'rc-tree/lib/interface';

import logo from 'assets/logo.png';
import {
  AppBar,
  AppDrawer
} from 'layouts';
import {
  Alert,
  Confirm,
  Fade,
  Tooltip,
  useDialog
} from 'components';
import { routes as ReactRouter } from 'services/common';
import { useUser } from 'services/user';
import {
  ProjectDrawer,
  ProjectList
} from 'pages/project';
import {
  ProjectCommentDrawer,
  ProjectCommentList
} from 'pages/project/comment';

type Menu = {
  title: string;
  path?: string;
  children?: Menu[];
  depth: number;
}

interface ToggleButtonProps {
  open: boolean;
  onClick: () => void;
  fromRight?: boolean;
}

const ToggleButton = ({
                        open,
                        onClick,
                        fromRight,
                      }: ToggleButtonProps) => {
  const closedIcon = fromRight ? <RightIcon /> : <LeftIcon />;
  const openedIcon = fromRight ? <LeftIcon /> : <RightIcon />;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        display:         'flex',
        width:           '16.25px',
        height:          '16.25px',
        backgroundColor: 'transparent',
        border:          '2px solid #301a9a',
      }}>
      {open ? openedIcon : closedIcon}
    </IconButton>
  );
};

interface DrawerContainerProps
  extends ToggleButtonProps {
  title: string;
  children: React.ReactNode;
}

const DrawerContainer = ({
                           title,
                           open,
                           onClick,
                           children,
                         }: DrawerContainerProps) => {
  return (
    <>
      <Toolbar />
      <Toolbar sx={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: open ? 'space-between' : 'flex-end',
        px:             [1],
      }}>
        <Fade in={open}>
          <Typography sx={{
            ml:       '19px',
            fontSize: '16px'
          }}>
            {title}
          </Typography>
        </Fade>
        <Box sx={{
          display:         'flex',
          justifyContent:  'center',
          alignContent:    'center',
          alignItems:      'center',
          width:           '36px',
          height:          '36px',
          backgroundColor: '#c4baf5',
          borderRadius:    '4px'
        }}>
          <ToggleButton open={open} onClick={onClick} />
        </Box>
      </Toolbar>
      <Divider />
      <Fade in={open}>
        {children}
      </Fade>
    </>
  );
};

const MenuNode = (menu: Menu): React.ReactNode => {
  const navigate = useNavigate();
  const location = useLocation();
  const getIcon = () => {
    if (menu.path) {
      if (location.pathname.startsWith(menu.path)) {
        return SelectedMenuIcon;
      }
      return MenuIcon;
    }
    if (menu.children) {
      return FolderOpenIcon;
    }
    return UnusableIcon;
  };
  const icon = getIcon();
  return (
    <TreeNode
      key={menu.title}
      checkable={false}
      title={
        <ListItem button
          disabled={!menu.path && !menu.children}
          sx={{ paddingLeft: `${16 + menu.depth * 24}px` }}
          onClick={() => {
            if (menu.path) {
              navigate(menu.path);
            }
          }}>
          <ListItemIcon>
            {React.createElement(icon)}
          </ListItemIcon>
          <ListItemText primary={menu.title} />
        </ListItem>
      }
    >
      {menu.children?.map(MenuNode)}
    </TreeNode>
  );
};

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
      title:    '프로젝트',
      depth:    0,
      children: [
        {
          title: '영업정보 관리',
          depth: 1,
        }, {
          title: '프로젝트 관리',
          path:  '/project',
          depth: 1,
        }, {
          title: '영업 관리',
          path:  '/sales',
          depth: 1,
        }, {
          title: '수금 관리',
          depth: 1,
        }, {
          title: '고객 관리',
          depth: 1,
        }
      ]
    }, {
      title: '업체 관리',
      path:  '/business-management',
      depth: 0,
    }, {
      title: '인사카드 관리',
      path:  '/hr/card',
      depth: 0,
    }, {
      title: '결재 관리',
      depth: 0,
    }, {
      title: 'WBS 관리',
      depth: 0,
    }, {
      title:    '관리자 메뉴',
      depth:    0,
      children: [
        {
          title: '사용자 관리',
          path:  '/user',
          depth: 1,
        }, {
          title: '조직 관리',
          path:  '/department',
          depth: 1,
        }, {
          title: '용역항목 관리',
          path:  '/test-service',
          depth: 1,
        }
      ]
    },
  ]);

  const handler = {
    toggleMenu:    () => {
      setOpenMenu(!openMenu);
    },
    toggleProject: () => {
      setOpenProject(!openProject);
    },
    toggleComment: () => {
      setOpenComment(!openComment);
    },
    dragStart:     (info: NodeDragEventParams) => {
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
    dragEnter:     (info: NodeDragEventParams & {
      expandedKeys: Key[];
    }) => {
      console.log(info);
    },
    drop:          (info: NodeDragEventParams & {
      dragNode: EventDataNode;
      dragNodesKeys: Key[];
      dropPosition: number;
      dropToGap: boolean;
    }) => {
      const dropKey = info.node.key as string;
      const dragKey = info.dragNode.key as string;
      const dropPos = info.node.pos.split('-');
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

      const loop = (data: Menu[],
                    path: string,
                    callback: (item: Menu,
                               index: number,
                               arr: Menu[]
                    ) => void
      ) => {
        data.forEach((item,
                      index,
                      arr
        ) => {
          if (item.path === path) {
            callback(item, index, arr);
            return;
          }
        });
      };
      const data: Menu[] = [...menuData];

      // Find dragObject
      let dragObj: Menu | undefined;
      loop(data, dragKey, (item,
                           index,
                           arr
      ) => {
        arr.splice(index, 1);
        dragObj = item;
      });
      if (dragObj) {
        // Drop on the gap (insert before or insert after)
        let ar: Menu[] | undefined;
        let i: number | undefined;
        loop(data, dropKey, (item,
                             index,
                             arr
        ) => {
          ar = arr;
          i = index;
        });
        if (ar && typeof i === 'number') {
          if (dropPosition === -1) {
            ar.splice(i, 0, dragObj);
          }
          else {
            ar.splice(i + 1, 0, dragObj);
          }
        }
      }

      setMenuData(data.map(menu => ({ ...menu, icon: FolderOpenIcon })));
    },
    logout:        () => {
      dialog.confirm({
        children:     '로그아웃하시겠습니까?',
        confirmText:  '로그아웃',
        afterConfirm: () => {
          logout();
          navigate('/login');
        }
      });
    },
    search:        (values: any,
                    { setSubmitting }: FormikHelpers<any>
                   ) => {
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
      <Box sx={{
        display: 'flex',
        width:   '100%'
      }}>
        <CssBaseline />
        <AppBar color="transparent" position="absolute">
          <Toolbar sx={{
            backgroundColor: '#3c3757'
          }}>
            <Grid container
              spacing={2}
              wrap="nowrap"
              sx={{
                display:        'flex',
                flexWrap:       'nowrap',
                alignContent:   'center',
                justifyContent: 'space-between',
              }}>
              <Grid item>
                <img src={logo} width="auto" height="26" alt="한양풍동실험연구소_로고" />
              </Grid>
            </Grid>
            {login && (
              <Grid item
                sx={{
                  display:        'flex',
                  flexWrap:       'nowrap',
                  justifyContent: 'flex-end',
                }}>
                <Formik
                  onSubmit={handler.search}
                  initialValues={{
                    search: ''
                  }}>
                  <Input
                    placeholder="통합검색"
                    sx={{
                      width:        '240px',
                      paddingLeft:  '10px',
                      paddingRight: '10px',
                      border:       '1px solid #44527b',
                      borderRadius: '8px',
                      color:        '#fff',
                    }}
                    endAdornment={
                      <InputAdornment
                        position="end"
                        sx={{
                          color: '#717ea8',
                        }}>
                        <SearchIcon />
                      </InputAdornment>
                    }
                  />
                </Formik>
                <Tooltip title="알림" placement="bottom">
                  <IconButton color="warning">
                    <NotificationsIcon />
                    <Typography color="white" children="4" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="계정 정보" placement="bottom">
                  <IconButton
                    color="info"
                    onClick={() => {
                      console.log(login);
                    }}>
                    <AccountIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="로그아웃" placement="bottom">
                  <IconButton color="info" onClick={handler.logout}>
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
          </Toolbar>
        </AppBar>
        <AppDrawer variant="permanent" open={openMenu}>
          <DrawerContainer
            title="업무메뉴"
            open={openMenu}
            onClick={handler.toggleMenu}
            children={
              <Tree showLine draggable defaultExpandAll
                onDragStart={handler.dragStart}
                onDragEnter={handler.dragEnter}
                onDrop={handler.drop}
                children={<>{menuData.map(MenuNode)}</>}
              />
            }
          />
        </AppDrawer>
        {path.startsWith('/project') && (
          <ProjectDrawer variant="permanent" open={openProject}>
            <DrawerContainer
              title="프로젝트 목록"
              open={openProject}
              onClick={handler.toggleProject}
              children={<ProjectList />}
            />
          </ProjectDrawer>
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
          }}>
          <Toolbar sx={{
            paddingLeft:  0,
            paddingRight: 0,
          }}
          />
          <ReactRouter />
        </Box>
        <Routes>
          <Route
            path="/project/:id/*"
            element={
              <ProjectCommentDrawer variant="permanent" open={openComment}>
                <DrawerContainer fromRight
                  title="메모"
                  open={openComment}
                  onClick={handler.toggleComment}
                  children={<ProjectCommentList />}
                />
              </ProjectCommentDrawer>
            }
          />
        </Routes>
      </Box>
      <Alert />
      <Confirm />
    </>
  );
};

export default App;
