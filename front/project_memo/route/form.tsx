import { useLocation } from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import React, {
  useCallback,
  useEffect,
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
  initialProjectMemoQuery,
  ProjectMemoAddParameter,
} from 'project_memo/parameter';
import { RootState } from 'services/reducer';
import useDialog from 'dialog/hook';

export default function ProjectMemoDrawerFormRoute() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { alert, error } = useDialog();
  const { requestAdd } = useSelector((root: RootState) => root.projectMemo);
  const setOpen = useCallback((open: boolean) => dispatch(projectMemoAction.setDrawer(open)), [dispatch]);
  const add = useCallback((formikProps: ProjectMemoAddParameter) => dispatch(projectMemoAction.add(formikProps)), [dispatch]);
  const getDefaultValue = useCallback((): ProjectMemoCategory =>
      projectMemoCategoryList.find(item => pathname.endsWith(item.toLowerCase())) || ProjectMemoCategory.BASIC,
    [pathname]);
  const formik = useFormik<ProjectMemoAddParameter>({
    initialValues: {} as ProjectMemoAddParameter,
    onSubmit:      (values) => {
      add(values);
    }
  });

  const defaultCategory = getDefaultValue();

  useEffect(() => {
    formik.setFieldValue('category', defaultCategory);
  }, [defaultCategory]);

  useEffect(() => {
    if (requestAdd === 'done') {
      formik.setSubmitting(false);
      alert('등록하였습니다.');
      formik.setValues({
        description: '',
        category:    defaultCategory,
      });
      dispatch(projectMemoAction.setFilter(initialProjectMemoQuery));
      dispatch(projectMemoAction.requestAdd('idle'));
    }
    else if (requestAdd === message) {
      formik.setSubmitting(false);
      error('등록에 실패하였습니다.');

    }
  }, [requestAdd]);

  return (
    <FormikProvider value={formik}>
      <ProjectMemoForm
        setOpen={setOpen}
      />
    </FormikProvider>
  );
}