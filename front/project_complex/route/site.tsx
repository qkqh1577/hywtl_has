import ProjectComplexSiteSection from 'project_complex/view/Site';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, { useCallback, } from 'react';
import useDialog from 'components/Dialog';
import { projectComplexAction } from 'project_complex/action';
import { ProjectComplexSiteParameter } from 'project_complex/parameter';
import { ProjectComplexSiteId } from 'project_complex/domain';

export default function ProjectComplexSiteRoute() {

  const dispatch = useDispatch();
  const { id, siteList, testDetail } = useSelector((root: RootState) => root.projectComplex);
  const { error } = useDialog();

  const add = useCallback(() => {
    if (!id) {
      error('프로젝트가 선택되지 않았습니다.');
      return;
    }
    dispatch(projectComplexAction.pushSite());
  }, [dispatch, id]);

  const update = useCallback((params: ProjectComplexSiteParameter) => dispatch(projectComplexAction.updateSite(params)), [dispatch]);
  const deleteSite = useCallback((id: ProjectComplexSiteId) => dispatch(projectComplexAction.deleteSite(id)), [dispatch]);
  return (
    <ProjectComplexSiteSection
      onAdd={add}
      list={siteList}
      onUpdate={update}
      onDelete={deleteSite}
      testDetail={testDetail}
    />
  );
}