import ProjectContainerRoute from 'project/route/container';
import ProjectEstimateListSection from 'project_estimate_contract/view/EstimateList';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import useId from 'services/useId';
import { AppRoute } from 'services/routes';
import React, { useEffect } from 'react';
import { projectEstimateAction } from 'project_estimate/action';
import { RootState } from 'services/reducer';
import { ProjectId } from 'project/domain';

function Element() {

  const dispatch = useDispatch();
  const id = useId();

  const { list } = useSelector((root: RootState) => root.projectEstimate);

  useEffect(() => {
    if (id) {
      dispatch(projectEstimateAction.setProjectId(ProjectId(id)));
    }
  }, [id]);

  return (
    <ProjectContainerRoute>
      <ProjectEstimateListSection list={list} />
    </ProjectContainerRoute>
  );
}

const projectEstimateContractRoute: AppRoute = {
  path:    '/project/sales-management/:id/estimate_contract',
  element: <Element />
};

export default projectEstimateContractRoute;