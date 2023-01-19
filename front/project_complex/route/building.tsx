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
import ProjectCustomEstimateDetailModalRoute from 'project_estimate/route/customDetailModal';
import ProjectSystemEstimateModalRoute from 'project_estimate/route/systemModal';

interface ProjectComplexBuildingRouteProps{
  loading: boolean
}

export default function ProjectComplexBuildingRoute(props: ProjectComplexBuildingRouteProps) {

  const dispatch = useDispatch();
  const {
          id,
          buildingList,
          siteList,
          requestPushBuilding,
          requestUpdateBuilding,
          requestDeleteBuilding,
          buildingListLoading
        } = useSelector((root: RootState) => root.projectComplex);
  const { contract } = useSelector((root: RootState) => root.projectBasic);
  const add = useCallback(() => dispatch(projectComplexAction.pushBuilding()), [dispatch]);
  const update = useCallback((params: ProjectComplexBuildingParameter) => dispatch(projectComplexAction.updateBuilding(params)), [dispatch]);
  const deleteBuilding = useCallback((id: ProjectComplexBuildingId) => dispatch(projectComplexAction.deleteBuilding(id)), [dispatch]);
  const openDocumentModal = useCallback((id: ProjectComplexBuildingId | undefined) => dispatch(projectComplexAction.buildingFileModal(id)), [dispatch]);
  const toEstimateAndContractTab = useCallback(() => window.open(`/project/sales-management/${id}/estimate_contract`), [id]);

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
      dispatch(projectComplexAction.setPushTestDetail(id));
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
    <>
      <ProjectComplexBuildingSection
        list={buildingList}
        loading={buildingListLoading}
        siteList={siteList}
        onAdd={add}
        onUpdate={update}
        onDelete={deleteBuilding}
        openDocumentModal={openDocumentModal}
        contract={contract}
        toEstimateAndContractTab={toEstimateAndContractTab}
      />
      <ProjectCustomEstimateDetailModalRoute />
      <ProjectSystemEstimateModalRoute />
    </>
  );
}
