import { useLocation } from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import React, {
  useCallback,
  useEffect,
  useState
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
import UserSelectModal from 'project_memo/view/UserModal';
import { ApiStatus } from 'components/DataFieldProps';

export default function ProjectMemoDrawerFormRoute() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
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
  const [userModal, setUserModal] = useState<boolean>(false);

  useEffect(() => {
    formik.setFieldValue('category', defaultCategory);
  }, [defaultCategory]);

  useEffect(() => {
    if (requestAdd === ApiStatus.RESPONSE) {
      formik.setValues({
        description: '',
        category:    defaultCategory,
      });
      dispatch(projectMemoAction.setFilter(initialProjectMemoQuery));
      dispatch(projectMemoAction.requestAdd(ApiStatus.IDLE));
    }
  }, [requestAdd]);

  return (
    <FormikProvider value={formik}>
      <ProjectMemoForm
        setOpen={setOpen}
        onSubmit={() => {
          formik.handleSubmit();
        }}
        openUserModal={() => {
          setUserModal(true);
        }}
        userModal={
          <UserSelectModal
            open={userModal}
            onClose={() => {
              setUserModal(false);
            }}
            afterSubmit={(idList) => {
              formik.setFieldValue('attendanceList', idList);
            }}
          />
        }
        attendanceList={formik.values.attendanceList}
      />
    </FormikProvider>
  );
}