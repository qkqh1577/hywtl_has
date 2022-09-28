import ProjectContainerStatusBar from 'project/view/Container/Status';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  initialProjectStatusBar,
  ProjectId,
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
} from 'type/Form';
import useId from 'services/useId';
import { RootState } from 'services/reducer';
import ProjectContainerTitle from 'project/view/Container/Title';
import { projectMemoAction } from 'project_memo/action';

export function StatusBar() {

  const id = useId();
  const { detail } = useSelector((root: RootState) => root.project);
  const dispatch = useDispatch();

  const setProjectMemoProjectId = useCallback((projectId: number | undefined) => dispatch(projectMemoAction.setProjectId(projectId ? ProjectId(projectId) : undefined)), [dispatch]);

  const initialValues = useMemo(() => toPartial(detail, initialProjectStatusBar), [detail]);
  const formik = useFormik<FormikPartial<ProjectStatusBar>>({
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      dispatch(projectAction.updateStatus({
        progressStatus:      values.progressStatus || undefined,
        estimateExpectation: values.estimateExpectation || undefined,
        estimateStatus:      values.estimateStatus || undefined,
        contractStatus:      values.contractStatus || undefined,
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

  useEffect(() => {
    if (!detail?.estimateExpectation) {
      return;
    }
    dispatch(projectAction.setEstimateExpectation(detail.estimateExpectation));
  }, [detail]);

  if (!detail || detail.id !== id) {
    return <ProjectContainerStatusBar />;
  }

  return (
    <FormikProvider value={formik}>
      <ProjectContainerStatusBar handleChangeEstimateExpectation={(e) => {
        dispatch(projectAction.setEstimateExpectation(e.target.value));
      }} />
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

export default function ProjectContainerRoute(props: Props) {

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
