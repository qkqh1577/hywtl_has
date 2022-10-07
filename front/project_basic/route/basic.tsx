import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React from 'react';
import ProjectBasicBasicSection from 'project_basic/view/BasicSection';
import { projectBasicAction } from 'project_basic/action';

export default function ProjectBasicBasicRoute() {
  const dispatch = useDispatch();
  const { basic } = useSelector((root: RootState) => root.projectBasic);

  return (
    <ProjectBasicBasicSection
      basic={basic}
      handleChangeBidType={(v) => dispatch(projectBasicAction.setBidType(v))}
    />
  );
}
