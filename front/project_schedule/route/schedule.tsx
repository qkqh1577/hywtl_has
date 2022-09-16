import React, {
  useCallback,
  useEffect
} from 'react';
import { AppRoute } from 'services/routes';
import ProjectSchedule from 'project_schedule/view';
import ProjectContainer from 'project/route/container';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectScheduleAction } from 'project_schedule/action';
import {
  initialProjectScheduleQuery,
  ProjectScheduleQuery
} from 'project_schedule/query';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { FormikSubmit } from 'type/Form';
import dayjs from 'dayjs';

function Element() {
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.project);
  const { filter, list, projectId } = useSelector((root: RootState) => root.projectSchedule);
  console.log('route index filter : ', filter);
  console.log('route index list : ', list);
  console.log('route index projectId : ', projectId);
  const setFilter = useCallback((formikProps: FormikSubmit<ProjectScheduleQuery>) => {
    const result: ProjectScheduleQuery = {
      ...(filter ?? initialProjectScheduleQuery),
      ...(formikProps.values ?? initialProjectScheduleQuery)
    };
    dispatch(projectScheduleAction.setFilter({
      ...formikProps,
      values: result,
    }));
  }, [dispatch]);

  const formik = useFormik<ProjectScheduleQuery>({
    initialValues: filter ?? initialProjectScheduleQuery,
    onSubmit:      (values,
                    helper
                   ) => {
      setFilter({
        values: {
          ...values,
          startDate: values.startDate ? dayjs(values.startDate)
          .format('YYYY-MM-DD') : undefined,
          endDate:   values.endDate ? dayjs(values.endDate)
          .format('YYYY-MM-DD') : undefined,
        },
        ...helper
      });
    }
  });

  useEffect(() => {
    if (detail && detail.id !== projectId) {
      dispatch(projectScheduleAction.setProjectId(detail.id));
      setFilter(formik);
    }
  }, []);

  return (
    <ProjectContainer>
      <FormikProvider value={formik}>
        <ProjectSchedule list={list} />
      </FormikProvider>
    </ProjectContainer>
  );
}

export const projectScheduleRoute: AppRoute = {
  path:    '/project/sales-management/:id/schedule',
  element: <Element />
};
