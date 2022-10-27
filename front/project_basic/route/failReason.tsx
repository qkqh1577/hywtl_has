import React, {
  useCallback,
  useEffect
} from 'react';
import ProjectBasicFailReasonSection from 'project_basic/view/FailReasonSection';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { ProjectBasicFailReasonParameter } from 'project_basic/parameter';
import { projectBasicAction } from 'project_basic/action';
import { ProjectEstimateExpectation } from 'project/domain';
import useDialog from 'dialog/hook';

export default function ProjectBasicFailReasonRoute() {
  const dispatch = useDispatch();
  const { error } = useDialog();
  const { detail } = useSelector((root: RootState) => root.project);
  const { id, failReason, requestUpdateFailReason } = useSelector((root: RootState) => root.projectBasic);

  const onUpdate = useCallback((params: Partial<ProjectBasicFailReasonParameter>) => dispatch(projectBasicAction.updateFailReason(params)), [dispatch]);

  useEffect(() => {
    if (requestUpdateFailReason === 'done') {
      dispatch(projectBasicAction.getFailReason(id));
      dispatch(projectBasicAction.requestUpdateFailReason('idle'));
    }
    else if (requestUpdateFailReason === message) {
      error('변경에 실패하였습니다.');
      dispatch(projectBasicAction.requestUpdateFailReason('idle'));
    }
  }, [requestUpdateFailReason]);

  if (detail?.estimateExpectation === ProjectEstimateExpectation.LOSE) {

    return (
      <ProjectBasicFailReasonSection
        detail={failReason}
        onUpdate={onUpdate}
      />
    );
  }
  return null;
}
