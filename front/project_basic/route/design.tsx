import React, {
  useCallback,
  useEffect
} from 'react';
import ProjectBasicDesignSection from 'project_basic/view/DesignSection';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { ProjectBasicDesignParameter } from 'project_basic/parameter';
import { projectBasicAction } from 'project_basic/action';
import { ApiStatus } from 'components/DataFieldProps';
import useDialog from 'components/Dialog';

export default function ProjectBasicDesignRoute() {
  const dispatch = useDispatch();
  const { error } = useDialog();
  const { id, design, requestUpdateDesign } = useSelector((root: RootState) => root.projectBasic);
  const onUpdate = useCallback((params: ProjectBasicDesignParameter) => dispatch(projectBasicAction.updateDesign(params)), [dispatch]);

  useEffect(() => {
    if (requestUpdateDesign === ApiStatus.DONE) {
      dispatch(projectBasicAction.getDesign(id));
      dispatch(projectBasicAction.requestUpdateDesign(ApiStatus.IDLE));
    }
    else if (requestUpdateDesign === ApiStatus.FAIL) {
      error('저장에 실패하였습니다.');
      dispatch(projectBasicAction.requestUpdateDesign(ApiStatus.IDLE));
    }
  }, [requestUpdateDesign]);
  return (
    <ProjectBasicDesignSection
      detail={design ?? {}}
      onUpdate={onUpdate}
    />
  );
}
