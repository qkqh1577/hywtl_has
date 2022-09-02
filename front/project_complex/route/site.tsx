import ProjectComplexSiteSection from 'project_complex/view/Site';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, { useCallback } from 'react';
import useDialog from 'components/Dialog';
import { projectComplexAction } from 'project_complex/action';
import {
  ProjectComplexSiteParameter
} from 'project_complex/parameter';

export default function ProjectComplexSiteRoute() {

  const dispatch = useDispatch();
  const { id, siteList, buildingList } = useSelector((root: RootState) => root.projectComplex);
  const { error } = useDialog();

  const add = useCallback(() => {
    if (!id) {
      error('프로젝트가 선택되지 않았습니다.');
      return;
    }
    dispatch(projectComplexAction.pushSite());
  }, [dispatch]);

  const update = useCallback((params: ProjectComplexSiteParameter) => dispatch(projectComplexAction.updateSite(params)), [dispatch]);

  return (
    <ProjectComplexSiteSection
      onAdd={add}
      list={siteList}
      buildingList={buildingList}
      onUpdate={update}
    />
  );
}