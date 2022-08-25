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
} from 'project/query';
import { FormikSubmit } from 'type/Form';
import { projectAction } from 'project/action';
import { projectDrawerAction } from 'app/domain/action';

export default function ProjectDrawerRoute() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isProjectPage = useMemo(() => pathname.startsWith('/project/sales-management'), [pathname]);
  const { open: openProjectMenu, filterOpen } = useSelector((root: RootState) => root.projectDrawer);
  const [list, setList] = useState<ProjectShortVO[]>([]);
  const { page } = useSelector((root: RootState) => root.project);
  const setFilter = useCallback((formikProps: FormikSubmit<ProjectQuery>) => dispatch(projectAction.setFilter(formikProps)), [dispatch]);
  const toggleFilter = useCallback(() => dispatch(projectDrawerAction.toggleFilter()), [dispatch]);

  const formik = useFormik({
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

  useEffect(() => {
    if (isProjectPage) {
      if (!page) {
        setFilter(formik);
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
      openMenu={openProjectMenu}
      list={list}
      onRowClick={onRowClick}
      formik={formik}
    />
  );
}