import React, {
  useCallback,
} from 'react';
import ProjectMemoDrawerFilter from 'project_memo/view/Drawer/Filter';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  initialProjectMemoQuery,
  ProjectMemoQuery
} from 'project_memo/parameter';
import {
  useDispatch
} from 'react-redux';
import { projectMemoAction } from 'project_memo/action';

export default function ProjectMemoDrawerFilterRoute() {
  const dispatch = useDispatch();
  const setFilter = useCallback(
    (formikProps: ProjectMemoQuery) =>
      dispatch(projectMemoAction.setFilter(formikProps)),
    [dispatch]);

  const formik = useFormik<ProjectMemoQuery>({
    initialValues: initialProjectMemoQuery,
    onSubmit:      (values) => {
      setFilter({ ...values, page: 0 });
    }
  });

  return (
    <FormikProvider value={formik}>
      <ProjectMemoDrawerFilter />
    </FormikProvider>

  );
}