import ProjectComplexBuildingFileModal from 'project_complex/view/BuildingFileModal';
import React, {
  useCallback,
  useEffect
} from 'react';
import { projectDocumentAction } from 'project_document/action';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectComplexAction } from 'project_complex/action';
import { ProjectComplexBuildingParameter } from 'project_complex/parameter';


export default function ProjectComplexBuildingFileModalRoute() {

  const dispatch = useDispatch();
  const { id: projectId, buildingDetail } = useSelector((root: RootState) => root.projectComplex);
  const { buildingList } = useSelector((root: RootState) => root.projectDocument);
  const onClose = useCallback(() => dispatch(projectComplexAction.setBuilding(undefined)), [dispatch]);

  const updateBuilding = useCallback((params: ProjectComplexBuildingParameter) => dispatch(projectComplexAction.updateBuilding(params)), [dispatch]);

  useEffect(() => {
    if (projectId) {
      dispatch(projectDocumentAction.setProjectId(projectId));
    }
    onClose();
  }, [projectId]);

  return (
    <ProjectComplexBuildingFileModal
      buildingId={buildingDetail?.id}
      fileId={buildingDetail?.buildingDocument?.id}
      fileList={buildingList}
      onClose={onClose}
      onUpdate={updateBuilding}
    />
  );
}