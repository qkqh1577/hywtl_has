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
import { ApiStatus } from 'components/DataFieldProps';
import useDialog from 'components/Dialog';
import ProjectBasicFailReasonModalRoute from 'project_status/route/failReasonModal';

export default function ProjectStatusRoute() {

  const dispatch = useDispatch();
  const { error } = useDialog();
  const { test, contract } = useSelector((root: RootState) => root.projectBasic);
  const { id, detail, requestUpdateStatus } = useSelector((root: RootState) => root.project);

  const onUpdate = useCallback((params: ProjectStatus) => dispatch(projectAction.updateStatus(params)), [dispatch]);
  const openFailReasonModal = useCallback(() => dispatch(projectAction.setFailReasonModal(true)), [dispatch]);

  useEffect(() => {
    if (requestUpdateStatus === ApiStatus.DONE) {
      dispatch(projectAction.setId(id));
      dispatch(projectAction.requestUpdateStatus(ApiStatus.IDLE));
    }
    else if (requestUpdateStatus === ApiStatus.FAIL) {
      error('변경에 실패하였습니다.');
      dispatch(projectAction.requestUpdateStatus(ApiStatus.IDLE));
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
      />
      <ProjectBasicFailReasonModalRoute />
    </Box>
  );
}
