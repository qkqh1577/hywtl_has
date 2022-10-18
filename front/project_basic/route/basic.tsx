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
import { ApiStatus } from 'components/DataFieldProps';
import useDialog from 'components/Dialog';

export default function ProjectBasicBasicRoute() {
  const dispatch = useDispatch();
  const { error } = useDialog();
  const { id, basic, requestUpdateBasic } = useSelector((root: RootState) => root.projectBasic);
  const onUpdate = useCallback((params: ProjectBasicParameter) => dispatch(projectBasicAction.updateBasic(params)), [dispatch]);

  useEffect(() => {
    if (requestUpdateBasic === ApiStatus.DONE) {
      dispatch(projectBasicAction.getBasic(id));
      dispatch(projectBasicAction.requestUpdateBasic(ApiStatus.IDLE));
    }
    else if (requestUpdateBasic === ApiStatus.FAIL) {
      error('저장에 실패하였습니다.');
      dispatch(projectBasicAction.requestUpdateBasic(ApiStatus.IDLE));
    }
  }, [requestUpdateBasic]);

  return (
    <ProjectBasicBasicSection
      basic={basic}
      onUpdate={onUpdate}
    />
  );
}
