import React, {
  useCallback,
  useEffect,
} from 'react';
import ProjectComplexBuildingSection from 'project_complex/view/Building';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectComplexAction } from 'project_complex/action';
import useDialog from 'dialog/hook';
import { ProjectComplexBuildingParameter, } from 'project_complex/parameter';
import { ProjectComplexBuildingId, } from 'project_complex/domain';
import { projectBasicAction } from 'project_basic/action';

export default function ProjectComplexBuildingRoute() {

  const dispatch = useDispatch();
  const {
          id,
          buildingList,
          siteList,
          requestPushBuilding,
          requestUpdateBuilding,
          requestDeleteBuilding
        } = useSelector((root: RootState) => root.projectComplex);
  const { error } = useDialog();
  const add = useCallback(() => dispatch(projectComplexAction.pushBuilding()), [dispatch]);
  const update = useCallback((params: ProjectComplexBuildingParameter) => dispatch(projectComplexAction.updateBuilding(params)), [dispatch]);
  const deleteBuilding = useCallback((id: ProjectComplexBuildingId) => dispatch(projectComplexAction.deleteBuilding(id)), [dispatch]);
  const openDocumentModal = useCallback((id: ProjectComplexBuildingId | undefined) => dispatch(projectComplexAction.buildingFileModal(id)), [dispatch]);

  useEffect(() => {
    if (requestPushBuilding === 'done') {
      dispatch(projectComplexAction.getBuildingList(id));
      dispatch(projectComplexAction.requestPushBuilding('idle'));
    }
    else if (requestPushBuilding === message) {
      error('추가에 실패하였습니다.');
      dispatch(projectComplexAction.requestPushBuilding('idle'));
    }
  }, [requestPushBuilding]);

  useEffect(() => {
    if (requestUpdateBuilding === 'done') {
      dispatch(projectComplexAction.getBuildingList(id));
      dispatch(projectComplexAction.requestUpdateBuilding('idle'));
      dispatch(projectBasicAction.getTest(id));
    }
    else if (requestUpdateBuilding === message) {
      error('변경에 실패하였습니다.');
      dispatch(projectComplexAction.requestUpdateBuilding('idle'));
    }
  }, [requestUpdateBuilding]);

  useEffect(() => {
    if (requestDeleteBuilding === 'done') {
      dispatch(projectComplexAction.getBuildingList(id));
      dispatch(projectComplexAction.requestDeleteBuilding('idle'));
      dispatch(projectBasicAction.getTest(id));
    }
    else if (requestPushBuilding === message) {
      error('삭제에 실패하였습니다.');
      dispatch(projectComplexAction.requestDeleteBuilding('idle'));
    }
  }, [requestDeleteBuilding]);

  return (
    <ProjectComplexBuildingSection
      list={buildingList}
      siteList={siteList}
      onAdd={add}
      onUpdate={update}
      onDelete={deleteBuilding}
      openDocumentModal={openDocumentModal}
    />
  );
}