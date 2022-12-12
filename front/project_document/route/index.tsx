import React, {
  useCallback,
  useEffect,
} from 'react';
import { AppRoute } from 'services/routes';
import useId from 'services/useId';
import ProjectContainer from 'project/route/container';
import ProjectDocument from 'project_document/view';
import { projectDocumentAction, } from 'project_document/action';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import ProjectDocumentAddModalRoute from 'project_document/route/addModal';
import ProjectDocumentDetailModalRoute from 'project_document/route/detailModal';
import {
  ProjectDocumentId,
  ProjectDocumentType
} from 'project_document/domain';
import { ProjectId } from 'project/domain';
import useDialog from 'dialog/hook';
import { useNavigate } from 'react-router-dom';

export type OnAddModalOpen = (type: ProjectDocumentType) => void;
export type OnDetailModalOpen = (id: ProjectDocumentId) => void;

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const { error } = useDialog();
  const navigate = useNavigate();
  const { detail } = useSelector((root: RootState) => root.project);
  const {
          receivedList,
          sentList,
          buildingList,
        } = useSelector((root: RootState) => root.projectDocument);

  useEffect(() => {
    if (id) {
      dispatch(projectDocumentAction.setProjectId(ProjectId(id)));
    }
    else {
      dispatch(projectDocumentAction.setProjectId(undefined));
    }
    dispatch(projectDocumentAction.addModal(undefined));
  }, [id]);

  const onAddModalOpen: OnAddModalOpen = useCallback(
    (type) => dispatch(projectDocumentAction.addModal(type)),
    [dispatch]);
  const onDetailModalOpen: OnDetailModalOpen = useCallback(
    (id) => dispatch(projectDocumentAction.setId(id)),
    [dispatch]);

  useEffect(() => {
    if (detail && !detail.code) {
      error('프로젝트 진행 현황을 등록으로 변경해 주시기 바랍니다.', () => navigate(-1));
    }
  }, [detail && detail.code]);

  return (
    <ProjectContainer>
      <ProjectDocument
        receivedList={receivedList}
        sentList={sentList}
        buildingList={buildingList}
        onAddModalOpen={onAddModalOpen}
        onDetailModalOpen={onDetailModalOpen}
      />
      <ProjectDocumentAddModalRoute />
      <ProjectDocumentDetailModalRoute />
    </ProjectContainer>
  );
}

const projectDocumentRoute: AppRoute = {
  path:    '/project/sales-management/:id/document',
  element: <Element />
};

export default projectDocumentRoute;
