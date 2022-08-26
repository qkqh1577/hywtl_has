import ProjectContainerStatusBar from 'project/view/Container/Status';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  initialProjectStatusBar,
  ProjectStatusBar
} from 'project/domain';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import React, {
  useCallback,
  useEffect,
  useMemo
} from 'react';
import ProjectContainer from 'project/view/Container';
import { projectAction } from 'project/action';
import {
  FormikPartial,
  toPartial,
  toValues
} from 'type/Form';
import useId from 'services/useId';
import { RootState } from 'services/reducer';
import ProjectContainerTitle from 'project/view/Container/Title';
import { projectMemoAction } from 'project_memo/action';

export function StatusBar() {

  const id = useId();
  const { detail } = useSelector((root: RootState) => root.project);
  const dispatch = useDispatch();

  const setProjectMemoProjectId = useCallback((projectId: number | undefined) => dispatch(projectMemoAction.setProjectId(projectId)), [dispatch]);

  const initialValues = useMemo(() => toPartial(detail, initialProjectStatusBar), [detail]);
  const formik = useFormik<FormikPartial<ProjectStatusBar>>({
    enableReinitialize: true,
    initialValues,
    onSubmit:           (values,
                         helper
                        ) => {
      dispatch(projectAction.updateStatus({
        values: toValues(values),
        ...helper
      }));
    },
  });

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'project/sales/id/set',
        id,
      });
    }
    setProjectMemoProjectId(id);
  }, [id]);

  if (!detail || detail.id !== id) {
    return <ProjectContainerStatusBar />;
  }

  return (
    <FormikProvider value={formik}>
      <ProjectContainerStatusBar />
    </FormikProvider>
  );
}

export function Title() {
  const { detail } = useSelector((root: RootState) => root.project);

  return (
    <ProjectContainerTitle
      code={detail?.code}
      name={detail?.name}
    />
  );
}

interface Props {
  children: React.ReactNode;
}

export default function (props: Props) {

  return (
    <>
      <ProjectContainer
        title={<Title />}
        statusBar={<StatusBar />}
        children={props.children}
      />
    </>
  );
}