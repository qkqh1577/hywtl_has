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
import { projectAction } from 'project/action';
import { closeStatus } from 'components/DataFieldProps';

export default function ProjectBasicBasicRoute() {
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.project);
  const { id, requestUpdateBasic } = useSelector((root: RootState) => root.projectBasic);
  const onUpdate = useCallback((params: ProjectBasicParameter) => dispatch(projectBasicAction.updateBasic(params)), [dispatch]);

  useEffect(() => {
    closeStatus(requestUpdateBasic, () => {
      dispatch(projectAction.setId(id));
    }, () => {
      dispatch(projectBasicAction.requestUpdateBasic('idle'));
    });
  }, [requestUpdateBasic]);

  return (
    <ProjectBasicBasicSection
      basic={detail}
      onUpdate={onUpdate}
    />
  );
}
