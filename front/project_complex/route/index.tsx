import { AppRoute } from 'services/routes';
import React, { useEffect } from 'react';
import ProjectContainerRoute from 'project/route/container';
import ProjectComplexSiteRoute from 'project_complex/route/site';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import useId from 'services/useId';
import { RootState } from 'services/reducer';
import { projectComplexAction } from 'project_complex/action';
import { ProjectId } from 'project/domain';
import ProjectComplexBuildingRoute from 'project_complex/route/building';
import ProjectComplexBuildingFileModalRoute from 'project_complex/route/buildingFileModal';

function Element() {

  const dispatch = useDispatch();
  const id = useId();
  const { id: projectId } = useSelector((root: RootState) => root.projectComplex);

  useEffect(() => {
    if (id && projectId !== id) {
      dispatch(projectComplexAction.setId(ProjectId(id)));
    }
  }, [id]);

  return (
    <ProjectContainerRoute>
      <ProjectComplexSiteRoute />
      <ProjectComplexBuildingRoute />
      <ProjectComplexBuildingFileModalRoute />
    </ProjectContainerRoute>
  );
}

const projectComplexRoute: AppRoute = {
  path:    '/project/sales-management/:id/complex',
  element: <Element />
};
export default projectComplexRoute;