import ProjectContainerRoute from 'project/route/container';
import { AppRoute } from 'services/routes';
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import ProjectCustomEstimateAddModalRoute from 'project_estimate/route/customAddModal';
import ProjectEstimateListRoute from 'project_estimate/route/list';
import ProjectContractListRoute from 'project_contract/route/list';
import RivalEstimateListRoute from 'rival_estimate/route/section';
import ProjectBidRoute from 'project_bid/route';
import ProjectCustomEstimateDetailModalRoute from 'project_estimate/route/customDetailModal';
import ProjectSystemEstimateModalRoute from 'project_estimate/route/systemModal';
import ProjectEstimateFinalModalRoute from 'project_estimate/route/finalModal';
import ProjectContractFinalModalRoute from 'project_contract/route/finalModal';
import ProjectCustomEstimateExtensionModalRoute from 'project_estimate/route/customExtensionModal';
import ProjectContractModalRoute from 'project_contract/route/modal';
import ProjectRivalBidListRoute from 'rival_bid/route/rivalBidList';
import useId from 'services/useId';
import { projectBidAction } from 'project_bid/action';
import {
  ProjectBasicBidType,
  ProjectId
} from 'project/domain';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { projectEstimateAction } from 'project_estimate/action';
import { rivalEstimateAction } from 'rival_estimate/action';
import { rivalBidAction } from 'rival_bid/action';
import { projectContractAction } from 'project_contract/action';
import { RootState } from 'services/reducer';
import useDialog from 'dialog/hook';
import { useNavigate } from 'react-router-dom';
import FinalCollectionModalRoute from 'project_contract/route/finalCollectionModalRoute';
import ContractModalRoute from 'project_contract/route/contractModalRoute';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.project);
  const { finalContractCollectionModal, contractCollectionModal } = useSelector((root: RootState) => root.projectContract);
  const { error } = useDialog();
  const navigate = useNavigate();

  useEffect(() => {
    if (detail && !detail.code) {
      error('프로젝트 진행 현황을 등록으로 변경해 주시기 바랍니다.', () => navigate(-1));
    }
  }, [detail && detail.code]);

  useEffect(() => {
    const projectId = id ? ProjectId(id) : undefined;
    dispatch(projectEstimateAction.setProjectId(projectId));
    dispatch(rivalEstimateAction.setProjectId(projectId));
    dispatch(projectBidAction.setProjectId(projectId));
    dispatch(rivalBidAction.setProjectId(projectId));
    dispatch(projectContractAction.setProjectId(projectId));
    return () => {
      dispatch(projectEstimateAction.setList(undefined));
      dispatch(projectContractAction.setList(undefined));
      dispatch(rivalBidAction.setList(undefined));
      dispatch(rivalEstimateAction.setList(undefined));
    }
  }, [id]);

  return (
    <ProjectContainerRoute>
      <Box sx={{ width: '100%' }}>
        <ProjectEstimateListRoute />
        <ProjectCustomEstimateAddModalRoute />
        <ProjectCustomEstimateDetailModalRoute />
        <ProjectCustomEstimateExtensionModalRoute />
        <ProjectSystemEstimateModalRoute />
        <ProjectEstimateFinalModalRoute />
        <ProjectContractModalRoute />
        {detail && detail.bidType === ProjectBasicBidType.DEFAULT && (
          <>
            <RivalEstimateListRoute />
          </>
        )}
        {detail && detail.bidType !== ProjectBasicBidType.DEFAULT && (
          <>
            <ProjectBidRoute />
            <ProjectRivalBidListRoute />
          </>
        )}
        <ProjectContractListRoute />
        <ProjectContractFinalModalRoute />
        {finalContractCollectionModal && <FinalCollectionModalRoute />}
        {contractCollectionModal && <ContractModalRoute />}
      </Box>
    </ProjectContainerRoute>
  );
}

const projectEstimateContractRoute: AppRoute = {
  path:    '/project/sales-management/:id/estimate_contract',
  element: <Element />
};

export default projectEstimateContractRoute;
