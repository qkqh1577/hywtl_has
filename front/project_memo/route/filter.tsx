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
import { FormikSubmit } from 'type/Form';
import { projectMemoAction } from 'project_memo/action';
import { RootState } from 'services/reducer';

export default function ProjectMemoDrawerFilterRoute() {

  const { projectId } = useSelector((root: RootState) => root.projectMemo);
  const dispatch = useDispatch();
  const setFilter = useCallback(
    (formikProps: FormikSubmit<ProjectMemoQuery>) =>
      dispatch(projectMemoAction.setFilter(formikProps)),
    [dispatch]);

  const formik = useFormik<ProjectMemoQuery>({
    initialValues: initialProjectMemoQuery,
    onSubmit:      (values,
                    helper
                   ) => {
      console.log(values);
      setFilter({
        values,
        ...helper
      });
    }
  });

  useEffect(() => {
    if (projectId) {
      dispatch(projectMemoAction.setFilter(formik));
    }
  }, [projectId]);

  return (
    <FormikProvider value={formik}>
      <ProjectMemoDrawerFilter
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const keyword: string = e.target['value'] ?? '';
            setFilter({
              ...formik,
              values: {
                keyword,
                category: formik.values.category,
                page:     0,
              },
            });

          }
        }}
      />
    </FormikProvider>

  );
}