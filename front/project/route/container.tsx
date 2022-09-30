import {
  useDispatch,
  useSelector
} from 'react-redux';
import React, {
  useCallback,
  useEffect
} from 'react';
import ProjectContainer from 'project/view/Container';
import { RootState } from 'services/reducer';
import ProjectContainerTitle from 'project/view/Container/Title';
import { ProjectStatusRoute } from 'project_status/route';
import { projectMemoAction } from 'project_memo/action';
import useId from 'services/useId';
import { ProjectId } from 'project/domain';

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
  const id = useId();
  const dispatch = useDispatch();
  const setProjectMemoProjectId = useCallback((projectId: ProjectId | undefined) => dispatch(projectMemoAction.setProjectId(projectId)), [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'project/sales/id/set',
        id,
      });
    }
    setProjectMemoProjectId(id as ProjectId | undefined);
  }, [id]);

  return (
    <>
      <ProjectContainer
        title={<Title />}
        status={<ProjectStatusRoute />}
        children={props.children}
      />
    </>
  );
}
