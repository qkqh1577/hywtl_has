import {
  useDispatch,
  useSelector
} from 'react-redux';
import React, {
  useCallback,
  useEffect,
} from 'react';
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
import { projectBasicAction } from 'project_basic/action';
import { projectCollectionAction } from 'project_collection/action';
import {useLocation, useNavigate} from 'react-router-dom';
import {
  initialProjectQuery,
  ProjectUpdateParameter
} from 'project/parameter';
import { closeStatus } from 'components/DataFieldProps';
import {projectComplexAction} from "../../project_complex/action";
import {projectMemoAction} from "../../project_memo/action";
import {initialPage} from "../../type/Page";

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

  const location = useLocation();
  const id = useId();
  const dispatch = useDispatch();

  if(location.state?.initialize){
    dispatch(projectComplexAction.setSiteList(undefined));
    dispatch(projectComplexAction.setBuildingList(undefined));
    dispatch(projectComplexAction.setTestDetail(undefined));
    dispatch(projectMemoAction.setPage(initialPage));
  }

  const { detail, requestDelete, requestUpdateStatus, filter, id: projectId } = useSelector((root: RootState) => root.project);
  const navigate = useNavigate();
  const onDelete = useCallback(() => dispatch(projectAction.delete()), [dispatch]);
  const onUpdate = useCallback((params: ProjectUpdateParameter) => dispatch(projectAction.updateFavorite(params)), [dispatch]);

  useEffect(() => {
    const projectId = id ? ProjectId(id) : undefined;
    dispatch(projectAction.setId(projectId));
    dispatch(projectBasicAction.setId(projectId));
    dispatch(projectCollectionAction.setProjectId(projectId));
  }, [id]);

  useEffect(() => {
    closeStatus(requestDelete,
      () => {
        dispatch(projectAction.setId(undefined));
        dispatch(projectAction.setFilter(initialProjectQuery));
        navigate('/project/sales-management');
      },
      () => {
        dispatch(projectAction.requestDelete('idle'));
      });
  }, [requestDelete]);

  useEffect(() => {
    closeStatus(requestUpdateStatus,
      () => {
        if (filter) {
          dispatch(projectAction.setFilter(filter));
          dispatch(projectAction.setId(projectId));
        }
      },
      () => {
        dispatch(projectAction.requestUpdateStatus('idle'));
      })
  }, [requestUpdateStatus])

  return (
    <PageLayout
      title={<Title />}
      titleRightComponent={
        <ProjectContainerTitleButtonBar
          onDelete={onDelete}
          onUpdate={onUpdate}
          isFavorite={detail?.isFavorite ?? false}
        />}
      filter={
        <Box sx={{
          display:  'flex',
          flexWrap: 'wrap',
          width:    '100%',
        }}>
          <ProjectStatusRoute
            filter={filter}
          />
          <ProjectContainerTab />
        </Box>
      }
      body={props.children}
    />
  );
}
