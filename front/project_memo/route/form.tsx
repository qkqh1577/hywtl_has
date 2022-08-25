import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, {
  useCallback,
  useEffect
} from 'react';
import { projectMemoAction } from 'project_memo/action';
import {
  ProjectMemoCategory,
  projectMemoCategoryList
} from 'project_memo/domain';
import {
  FormikProvider,
  useFormik
} from 'formik';
import ProjectMemoForm from 'project_memo/view/Drawer/Form';
import {
  FormikPartial,
  FormikSubmit
} from 'type/Form';
import {
  initialProjectMemoParameter,
  ProjectMemoParameter
} from 'project_memo/parameter';

export default function ProjectMemoDrawerFormRoute() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const setOpen = useCallback((open: boolean) => dispatch(projectMemoAction.setDrawer(open)), [dispatch]);
  const add = useCallback((formikProps: FormikSubmit<ProjectMemoParameter>) => dispatch(projectMemoAction.add(formikProps)), [dispatch]);
  const getDefaultValue = useCallback((): ProjectMemoCategory | undefined =>
      projectMemoCategoryList.find(item => pathname.endsWith(item.toLowerCase())),
    [pathname]);
  const formik = useFormik<FormikPartial<ProjectMemoParameter>>({
    initialValues: initialProjectMemoParameter,
    onSubmit:      (values,
                    helper
                   ) => {
      add({
        values: values as ProjectMemoParameter,
        ...helper,
      });
    }
  });

  const defaultCategory = getDefaultValue();

  useEffect(() => {
    formik.setFieldValue('category', defaultCategory);
  }, [defaultCategory]);

  return (
    <FormikProvider value={formik}>
      <ProjectMemoForm
        setOpen={setOpen}
        onSubmit={() => {
          formik.handleSubmit();
        }}
      />
    </FormikProvider>
  );
}