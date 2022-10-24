import React, {
  useCallback,
  useEffect
} from 'react';
import { AppRoute } from 'services/routes';
import ProjectContainer from 'project/route/container';
import ProjectLog from 'project_log/view';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import {
  initialProjectLogQuery,
  ProjectLogQuery
} from 'project_log/query';
import { projectLogAction } from 'project_log/action';
import {
  FormikProvider,
  useFormik
} from 'formik';
import dayjs from 'dayjs';
import useId from 'services/useId';
import { ProjectId } from 'project/domain';

function Element() {
  const dispatch = useDispatch();
  const id = useId();
  const { filter, page } = useSelector((root: RootState) => root.projectLog);
  const setFilter = useCallback((formikProps: ProjectLogQuery) => dispatch(projectLogAction.setFilter(formikProps)), [dispatch]);

  const formik = useFormik<ProjectLogQuery>({
    initialValues: filter ?? initialProjectLogQuery,
    onSubmit:      (values) => {
      setFilter({
        ...values,
        createdAt: values.createdAt ? dayjs(values.createdAt)
        .format('YYYY-MM-DD') : undefined,
        page:      0
      });
    }
  });

  const onPageChange = (event,
                        page
  ) => {
    setFilter({ page });
  };

  const onRowsPerPageChange = (event) => {
    const size = +(event.target.value) || 10;
    setFilter({ size, page: 0 });
  };

  useEffect(() => {
    dispatch(projectLogAction.setId(id ? ProjectId(id) : undefined));
  }, [id]);

  useEffect(() => {
    formik.setSubmitting(false);
  }, [page]);

  return (
    <ProjectContainer>
      <FormikProvider value={formik}>
        <ProjectLog
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </FormikProvider>

    </ProjectContainer>
  );
}

const projectLogRoute: AppRoute = {
  path:    '/project/sales-management/:id/log',
  element: <Element />
};

export default projectLogRoute;