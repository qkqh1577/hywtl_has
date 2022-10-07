import React, {
  useCallback,
  useEffect,
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
  useDispatch,
  useSelector
} from 'react-redux';
import { projectMemoAction } from 'project_memo/action';
import { RootState } from 'services/reducer';

export default function ProjectMemoDrawerFilterRoute() {

  const { projectId } = useSelector((root: RootState) => root.projectMemo);
  const dispatch = useDispatch();
  const setFilter = useCallback(
    (formikProps: ProjectMemoQuery) =>
      dispatch(projectMemoAction.setFilter(formikProps)),
    [dispatch]);

  const formik = useFormik<ProjectMemoQuery>({
    initialValues: initialProjectMemoQuery,
    onSubmit:      (values) => {
      setFilter(values);
    }
  });

  useEffect(() => {
    if (projectId) {
      dispatch(projectMemoAction.setFilter(initialProjectMemoQuery));
    }
  }, [projectId]);

  return (
    <FormikProvider value={formik}>
      <ProjectMemoDrawerFilter
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const keyword: string = e.target['value'] ?? '';
            setFilter({
              keyword,
              category: formik.values.category,
              page:     0,
            });
          }
        }}
      />
    </FormikProvider>

  );
}