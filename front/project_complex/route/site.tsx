import ProjectComplexSiteSection from 'project_complex/view/Site';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, {
  useCallback,
  useEffect,
} from 'react';
import useDialog from 'components/Dialog';
import { projectComplexAction } from 'project_complex/action';
import { ProjectComplexSiteParameter } from 'project_complex/parameter';
import { ProjectComplexSiteId } from 'project_complex/domain';
import { ApiStatus } from 'components/DataFieldProps';
import { projectBasicAction } from 'project_basic/action';

export default function ProjectComplexSiteRoute() {

  const dispatch = useDispatch();
  const { error } = useDialog();
  const { id, siteList, testDetail, requestPushSite, requestUpdateSite, requestDeleteSite } = useSelector((root: RootState) => root.projectComplex);

  const add = useCallback(() => dispatch(projectComplexAction.pushSite()), [dispatch]);
  const update = useCallback((params: ProjectComplexSiteParameter) => dispatch(projectComplexAction.updateSite(params)), [dispatch]);
  const deleteSite = useCallback((id: ProjectComplexSiteId) => dispatch(projectComplexAction.deleteSite(id)), [dispatch]);

  useEffect(() => {
    if (requestPushSite === ApiStatus.DONE) {
      dispatch(projectComplexAction.getSiteList(id));
      dispatch(projectComplexAction.requestPushSite(ApiStatus.IDLE));
    }
    else if (requestPushSite === ApiStatus.FAIL) {
      error('추가에 실패하였습니다.');
      dispatch(projectComplexAction.requestPushSite(ApiStatus.IDLE));
    }
  }, [requestPushSite]);

  useEffect(() => {
    if (requestUpdateSite === ApiStatus.DONE) {
      dispatch(projectComplexAction.getSiteList(id));
      dispatch(projectComplexAction.requestUpdateSite(ApiStatus.IDLE));
      dispatch(projectBasicAction.getTest(id));
    }
    else if (requestUpdateSite === ApiStatus.FAIL) {
      error('변경에 실패하였습니다.');
      dispatch(projectComplexAction.requestUpdateSite(ApiStatus.IDLE));
    }
  }, [requestUpdateSite]);

  useEffect(() => {
    if (requestDeleteSite === ApiStatus.DONE) {
      dispatch(projectComplexAction.getSiteList(id));
      dispatch(projectComplexAction.requestDeleteSite(ApiStatus.IDLE));
      dispatch(projectBasicAction.getTest(id));
    }
    else if (requestDeleteSite === ApiStatus.FAIL) {
      error('삭제에 실패하였습니다.');
      dispatch(projectComplexAction.requestDeleteSite(ApiStatus.IDLE));
    }
  }, [requestDeleteSite]);

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