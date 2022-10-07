import {
  useDispatch,
  useSelector
} from 'react-redux';
import React, { useEffect } from 'react';
import ProjectContainer from 'project/view/Container';
import { RootState } from 'services/reducer';
import ProjectContainerTitle from 'project/view/Container/Title';
import { ProjectStatusRoute } from 'project_status/route';
import useId from 'services/useId';
import { ProjectId } from 'project/domain';
import { projectAction } from 'project/action';

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

  useEffect(() => {
    dispatch(projectAction.setId(id ? ProjectId(id) : undefined));
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
