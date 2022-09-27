import { AppRoute } from 'services/routes';
import React, { useEffect } from 'react';
import ProjectContainerRoute from 'project/route/container';
import ProjectBasicBasicRoute from 'project_basic/route/basic';
import ProjectBasicEstimateRoute from 'project_basic/route/estimate';
import ProjectBasicBusinessRoute from 'project_basic/route/business';
import ProjectBasicTestRoute from 'project_basic/route/test';
import ProjectBasicDesignRoute from 'project_basic/route/design';
import ProjectBasicBidRoute from 'project_basic/route/bid';
import ProjectBasicContractRoute from 'project_basic/route/contract';
import ProjectBasicFailReasonRoute from 'project_basic/route/failReason';
import { projectBasicActionType } from 'project_basic/action';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';

function Element() {
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.project);
  const { id } = useSelector((root: RootState) => root.projectBasic);

  useEffect(() => {
    if (detail && detail.id !== id) {
      dispatch(projectBasicActionType.setId(detail.id));
      dispatch(projectBasicActionType.setBasic({ ...detail }));
    }
  }, [detail]);

  return (
    <>
      <ProjectBasicBasicRoute />
      {/*<ProjectBasicBusinessRoute />*/}
      <ProjectBasicDesignRoute />
      {/*<ProjectBasicTestRoute />*/}
      {/*<ProjectBasicEstimateRoute />*/}
      {/*<ProjectBasicBidRoute />*/}
      <ProjectBasicContractRoute />
      {/*<ProjectBasicFailReasonRoute />*/}
    </>
  );
}

const projectBasicRoute: AppRoute = {
  path:    '/project/sales-management/:id/basic',
  element: (
             <ProjectContainerRoute>
               <Element />
             </ProjectContainerRoute>
           )
};

export default projectBasicRoute;
