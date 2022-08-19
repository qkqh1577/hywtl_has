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
import {
  initialProjectQuery,
  ProjectQuery
} from 'project/query';
import { projectAction } from 'project/action';
import { useFormik } from 'formik';
import { ProjectShortVO } from 'project/domain';
import { ProjectDrawerProps } from 'app/view/App/ProjectDrawer';
import { FormikSubmit } from 'type/Form';

export default function () {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isProjectPage = useMemo(() => pathname.startsWith('/project/sales-management'), [pathname]);
  const isLoginPage = useMemo(() => pathname === '/login', [pathname]);
  const { alert } = useDialog();
  const { user, getLoginUser, logout } = useLogin();
  const { open: openMenu, menu, toggleMenu } = useMenu();
  const { open: openProjectMenu, filterOpen } = useSelector((root: RootState) => root.projectDrawer);
  const { page } = useSelector((root: RootState) => root.project);
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

  const onRowClick: ProjectDrawerProps['onRowClick'] = (item) => {
    navigate(`/project/sales-management/${item.id}/basic`);
  };

  const openProjectAddModal = useCallback(() => dispatch(projectAction.setAddModal(true)), [dispatch]);

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
      logoutButtonProps={{ handleLogout: logout }}
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
        list,
        openProjectAddModal
      }}
    />
  );
}