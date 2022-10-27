import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, {
  useCallback,
  useEffect
} from 'react';
import ProjectBasicBasicSection from 'project_basic/view/BasicSection';
import { projectBasicAction } from 'project_basic/action';
import { ProjectBasicParameter } from 'project_basic/parameter';
import useDialog from 'dialog/hook';
import { projectAction } from 'project/action';

export default function ProjectBasicBasicRoute() {
  const dispatch = useDispatch();
  const { error } = useDialog();
  const { detail } = useSelector((root: RootState) => root.project);
  const { id, requestUpdateBasic } = useSelector((root: RootState) => root.projectBasic);
  const onUpdate = useCallback((params: ProjectBasicParameter) => dispatch(projectBasicAction.updateBasic(params)), [dispatch]);

  useEffect(() => {
    if (requestUpdateBasic === 'done') {
      dispatch(projectAction.setId(id));
      dispatch(projectBasicAction.requestUpdateBasic('idle'));
    }
    else if (requestUpdateBasic === message) {
      error('저장에 실패하였습니다.');
      dispatch(projectBasicAction.requestUpdateBasic('idle'));
    }
  }, [requestUpdateBasic]);

  return (
    <ProjectBasicBasicSection
      basic={detail}
      onUpdate={onUpdate}
    />
  );
}
