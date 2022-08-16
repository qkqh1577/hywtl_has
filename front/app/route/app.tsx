import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import useDialog from 'components/Dialog';
import useLogin from 'app/service/loginHook';
import useMenu from 'app/service/menuHook';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import App from 'app/view/App';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectDrawerAction } from 'app/domain/action';
import { FormikSubmit } from 'user/action';
import {
  initialProjectQuery,
  ProjectQuery
} from 'project/query';
import { projectAction } from 'project/action';
import { useFormik } from 'formik';
import { ProjectShortVO } from 'project/domain';
import { ProjectDrawerProps } from 'app/view/App/ProjectDrawer';

export default function () {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { alert, confirm } = useDialog();
  const { user, getLoginUser, logout } = useLogin();
  const { open: openMenu, menu, toggleMenu } = useMenu();
  const { open: openProjectMenu, filterOpen } = useSelector((root: RootState) => root.projectDrawer);
  const { page } = useSelector((root: RootState) => root.project);
  const isProjectPage = useMemo(() => pathname.startsWith('/project'), [pathname]);
  const isLoginPage = useMemo(() => pathname === '/login', [pathname]);
  const [list, setList] = useState<ProjectShortVO[]>([]);
  const toggleFilter = useCallback(() => dispatch(projectDrawerAction.toggleFilter()), [dispatch]);
  const toggleProjectMenu = useCallback(() => dispatch(projectDrawerAction.toggleMenu()), [dispatch]);
  const setFilter = useCallback((formikProps: FormikSubmit<ProjectQuery>) => dispatch(projectAction.setFilter(formikProps)), [dispatch]);
  const projectFormik = useFormik({
    initialValues: initialProjectQuery,
    onSubmit:      (values,
                    helper
                   ) => {
      setFilter({
        values,
        ...helper
      });
    }
  });

  const handleLogout = () => {
    confirm({
      children:     '로그아웃하시겠습니까?',
      confirmText:  '로그아웃',
      afterConfirm: () => {
        logout();
      }
    });
  };

  const onRowClick: ProjectDrawerProps['onRowClick'] = (item) => {
    navigate(`/project/${item.id}/basic`);
  };

  useEffect(() => {
    if (pathname !== '/login') {
      if (user === null) {
        alert('세션이 만료되었습니다. 로그인 페이지로 이동합니다.', () => {
          navigate('/login');
        });
        return;
      }
      if (!user) {
        getLoginUser();
      }
    }
  }, [user, pathname]);

  useEffect(() => {
    if (isProjectPage) {
      if (!page) {
        setFilter(projectFormik);
        setList([]);
      }
      else {
        if (page.number === 0) {
          setList(page.content);
        }
        else {
          setList([...list, ...page.content]);
        }
      }
    }
  }, [page]);

  return (
    <App
      isLoginPage={isLoginPage}
      isProjectPage={isProjectPage}
      loginButtonProps={{ handleLogout }}
      menuDrawerProps={{
        menu,
        openMenu,
        toggleMenu
      }}
      projectDrawerProps={{
        openMenu:   openProjectMenu,
        toggleMenu: toggleProjectMenu,
        openFilter: filterOpen,
        formik:     projectFormik,
        toggleFilter,
        onRowClick,
        list
      }}
    />
  );
}