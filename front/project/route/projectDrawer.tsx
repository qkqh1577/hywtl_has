import ProjectDrawer, { ProjectDrawerProps } from 'project/view/Drawer';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import { RootState } from 'services/reducer';
import { ProjectShortVO } from 'project/domain';
import { useFormik } from 'formik';
import {
  initialProjectQuery,
  ProjectQuery
} from 'project/parameter';
import { projectAction } from 'project/action';

export default function ProjectDrawerRoute() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isProjectPage = useMemo(() => pathname.startsWith('/project/'), [pathname]);
  const { drawerOpen, filterOpen, filterStatus, id, loading, page } = useSelector((root: RootState) => root.project);
  const [list, setList] = useState<ProjectShortVO[]>([]);
  const setFilter = useCallback((query: ProjectQuery) => dispatch(projectAction.setFilter(query)), [dispatch]);
  const toggleFilter = useCallback(() => dispatch(projectAction.toggleFilter()), [dispatch]);

  const onRowClick: ProjectDrawerProps['onRowClick'] = (item) => {
    dispatch(projectAction.setId(item.id));
    navigate(`/project/sales-management/${item.id}/basic`,{
      state:{
        initialize: true
      }
    });
  };

  const formik = useFormik({
    initialValues: initialProjectQuery,
    onSubmit:      (values) => {
      setFilter(values);
    }
  });

  useEffect(() => {
    if (filterStatus === 'close') {
      formik.setSubmitting(false);
      dispatch({ type: 'app/project/filter/status', filterStatus: 'idle' });
    }
  }, [filterStatus]);

  useEffect(() => {
    if (pathname === '/project/sales-management') {
      setFilter(initialProjectQuery);
    }
  }, [pathname]);

  useEffect(() => {
    if (isProjectPage) {
      if (!page) {
        setFilter(initialProjectQuery);
      }
      else {
        setList([...page]);
      }
    }
  }, [page]);

  if (!isProjectPage) {
    return null;
  }

  return (
    <ProjectDrawer
      loading={loading}
      openFilter={filterOpen}
      toggleFilter={toggleFilter}
      openMenu={drawerOpen}
      list={list}
      onRowClick={onRowClick}
      formik={formik}
      id={id!}
    />
  );
}
