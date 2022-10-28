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
import { ProjectComplexBuildingParameter, } from 'project_complex/parameter';
import { ProjectComplexBuildingId, } from 'project_complex/domain';
import { projectBasicAction } from 'project_basic/action';
import { closeStatus } from 'components/DataFieldProps';

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
  const add = useCallback(() => dispatch(projectComplexAction.pushBuilding()), [dispatch]);
  const update = useCallback((params: ProjectComplexBuildingParameter) => dispatch(projectComplexAction.updateBuilding(params)), [dispatch]);
  const deleteBuilding = useCallback((id: ProjectComplexBuildingId) => dispatch(projectComplexAction.deleteBuilding(id)), [dispatch]);
  const openDocumentModal = useCallback((id: ProjectComplexBuildingId | undefined) => dispatch(projectComplexAction.buildingFileModal(id)), [dispatch]);

  useEffect(() => {
    closeStatus(requestPushBuilding, () => {
      dispatch(projectComplexAction.getBuildingList(id));
    }, () => {
      dispatch(projectComplexAction.requestPushBuilding('idle'));
    });
  }, [requestPushBuilding]);

  useEffect(() => {
    closeStatus(requestUpdateBuilding, () => {
      dispatch(projectComplexAction.getBuildingList(id));
      dispatch(projectBasicAction.getTest(id));
    }, () => {
      dispatch(projectComplexAction.requestUpdateBuilding('idle'));
    });
  }, [requestUpdateBuilding]);

  useEffect(() => {
    closeStatus(requestDeleteBuilding, () => {
      dispatch(projectComplexAction.getBuildingList(id));
      dispatch(projectBasicAction.getTest(id));
    }, () => {
      dispatch(projectComplexAction.requestDeleteBuilding('idle'));
    });
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