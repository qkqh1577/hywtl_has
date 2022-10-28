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
import { closeStatus } from 'components/DataFieldProps';

export default function ProjectBasicDesignRoute() {
  const dispatch = useDispatch();
  const { id, design, requestUpdateDesign } = useSelector((root: RootState) => root.projectBasic);
  const onUpdate = useCallback((params: ProjectBasicDesignParameter) => dispatch(projectBasicAction.updateDesign(params)), [dispatch]);

  useEffect(() => {
    closeStatus(requestUpdateDesign, () => {
      dispatch(projectBasicAction.getDesign(id));
    }, () => {
      dispatch(projectBasicAction.requestUpdateDesign('idle'));
    });
  }, [requestUpdateDesign]);
  return (
    <ProjectBasicDesignSection
      detail={design ?? {}}
      onUpdate={onUpdate}
    />
  );
}
