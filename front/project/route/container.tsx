import {
  useDispatch,
  useSelector
} from 'react-redux';
import React, { useEffect } from 'react';
import { RootState } from 'services/reducer';
import ProjectContainerTitle from 'project/view/Container/Title';
import ProjectStatusRoute from 'project_status/route';
import useId from 'services/useId';
import { ProjectId } from 'project/domain';
import { projectAction } from 'project/action';
import PageLayout from 'layouts/PageLayout';
import ProjectContainerTitleButtonBar from 'project/view/Container/TitleButtonBar';
import { Box } from '@mui/material';
import ProjectContainerTab from 'project/view/Container/Tab';

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
    <PageLayout
      title={<Title />}
      titleRightComponent={<ProjectContainerTitleButtonBar />}
      filter={
        <Box sx={{
          display:  'flex',
          flexWrap: 'wrap',
          width:    '100%',
        }}>
          <ProjectStatusRoute />
          <ProjectContainerTab />
        </Box>
      }
      body={props.children}
    />
  );
}
