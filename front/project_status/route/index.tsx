import React, {
  useCallback,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import ProjectStatusLeftBar from 'project_status/view/StatusBar/Left';
import ProjectStatusRightBar from 'project_status/view/StatusBar/Right';
import { Box } from '@mui/material';
import {
  ProjectEstimateExpectation,
  ProjectStatus
} from 'project/domain';
import { projectAction } from 'project/action';
import useDialog from 'dialog/hook';
import ProjectBasicFailReasonModalRoute from 'project_status/route/failReasonModal';

export default function ProjectStatusRoute() {

  const dispatch = useDispatch();
  const { error } = useDialog();
  const { id, detail, requestUpdateStatus } = useSelector((root: RootState) => root.project);
  const { test, contract } = useSelector((root: RootState) => root.projectBasic);
  const { detail: collection } = useSelector((root: RootState) => root.projectCollection);

  const onUpdate = useCallback((params: ProjectStatus) => dispatch(projectAction.updateStatus(params)), [dispatch]);
  const openFailReasonModal = useCallback(() => dispatch(projectAction.setFailReasonModal(true)), [dispatch]);

  useEffect(() => {
    if (requestUpdateStatus === 'done') {
      dispatch(projectAction.setId(id));
      dispatch(projectAction.requestUpdateStatus('idle'));
    }
    else if (requestUpdateStatus === message) {
      error('변경에 실패하였습니다.');
      dispatch(projectAction.requestUpdateStatus('idle'));
    }
  }, [requestUpdateStatus]);

  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      flexWrap:       'nowrap',
      padding:        '0 20px 20px 20px',
      justifyContent: 'space-between',
    }}>
      <ProjectStatusLeftBar
        bidType={detail?.bidType}
        progressStatus={detail?.progressStatus}
        estimateExpectation={detail?.estimateExpectation}
        estimateStatus={detail?.estimateStatus}
        contractStatus={detail?.contractStatus}
        bidStatus={detail?.bidStatus}
        onUpdate={(status: ProjectStatus) => {
          if (status.estimateExpectation && status.estimateExpectation === ProjectEstimateExpectation.LOSE) {
            openFailReasonModal();
          }
          else {
            onUpdate(status);
          }
        }}
      />
      <ProjectStatusRightBar
        targetTest={test?.targetTest}
        testAmount={contract?.estimate?.plan?.testAmount}
        reviewAmount={contract?.estimate?.plan?.reviewAmount}
        stageList={collection?.stageList}
      />
      <ProjectBasicFailReasonModalRoute />
    </Box>
  );
}
