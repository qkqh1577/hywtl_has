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
import { FormikSubmit } from 'type/Form';
import {
  FormikProvider,
  useFormik
} from 'formik';
import dayjs from 'dayjs';

function Element() {
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.project);
  const { filter, page, id } = useSelector((root: RootState) => root.projectLog);
  const setFilter = useCallback((formikProps: FormikSubmit<ProjectLogQuery>) => {
    const result: ProjectLogQuery = {
      ...(filter ?? initialProjectLogQuery),
      ...(formikProps.values ?? initialProjectLogQuery)
    };
    dispatch(projectLogAction.setFilter({
      ...formikProps,
      values: result,
    }));
  }, [dispatch]);

  const formik = useFormik<ProjectLogQuery>({
    initialValues: filter ?? initialProjectLogQuery,
    onSubmit:      (values,
                    helper
                   ) => {
      setFilter({
        values: {
          ...values,
          createdAt: values.createdAt ? dayjs(values.createdAt)
          .format('YYYY-MM-DD') : undefined,
          page:      0
        },
        ...helper
      });
    }
  });

  const onPageChange = (event,
                        page
  ) => {
    setFilter({ ...formik, values: { page } });
  };

  const onRowsPerPageChange = (event) => {
    const size = +(event.target.value) || 10;
    setFilter({ ...formik, values: { size, page: 0 } });
  };
  useEffect(() => {
    if (detail && detail.id !== id) {
      dispatch(projectLogAction.setId(detail.id));
      setFilter(formik);
    }
  }, [detail]);
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

export const projectLogRoute: AppRoute = {
  path:    `/project/sales-management/:id/log`,
  element: <Element />
};
