import ProjectDrawer, { ProjectDrawerProps } from 'app/view/App/ProjectDrawer';
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
import { projectDrawerAction } from 'app/domain/action';

export default function ProjectDrawerRoute() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isProjectPage = useMemo(() => pathname.startsWith('/project/'), [pathname]);
  const { open, filterOpen, filterStatus } = useSelector((root: RootState) => root.projectDrawer);
  const [list, setList] = useState<ProjectShortVO[]>([]);
  const { page } = useSelector((root: RootState) => root.project);
  const setFilter = useCallback((query: ProjectQuery) => dispatch(projectAction.setFilter(query)), [dispatch]);
  const toggleFilter = useCallback(() => dispatch(projectDrawerAction.toggleFilter()), [dispatch]);

  const onRowClick: ProjectDrawerProps['onRowClick'] = (item) => {
    navigate(`/project/sales-management/${item.id}/basic`);
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
        if (page.number === 0) {
          setList(page.content);
        }
        else {
          setList([...list, ...page.content]);
        }
      }
    }
  }, [page]);

  if (!isProjectPage) {
    return null;
  }

  return (
    <ProjectDrawer
      openFilter={filterOpen}
      toggleFilter={toggleFilter}
      openMenu={open}
      list={list}
      onRowClick={onRowClick}
      formik={formik}
    />
  );
}