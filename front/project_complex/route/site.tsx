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
import { projectComplexAction } from 'project_complex/action';
import { ProjectComplexSiteParameter } from 'project_complex/parameter';
import { ProjectComplexSiteId } from 'project_complex/domain';
import { projectBasicAction } from 'project_basic/action';
import { closeStatus } from 'components/DataFieldProps';

interface ProjectComplexSiteRouteProps {
  loading: boolean
}

export default function ProjectComplexSiteRoute(props: ProjectComplexSiteRouteProps) {

  const dispatch = useDispatch();
  const { id, siteList, siteListLoading, testDetail, requestPushSite, requestUpdateSite, requestDeleteSite } = useSelector((root: RootState) => root.projectComplex);

  const add = useCallback(() => dispatch(projectComplexAction.pushSite()), [dispatch]);
  const update = useCallback((params: ProjectComplexSiteParameter) => dispatch(projectComplexAction.updateSite(params)), [dispatch]);
  const deleteSite = useCallback((id: ProjectComplexSiteId) => dispatch(projectComplexAction.deleteSite(id)), [dispatch]);

  useEffect(() => {
    closeStatus(requestPushSite, () => {
      dispatch(projectComplexAction.getSiteList(id));
    }, () => {
      dispatch(projectComplexAction.requestPushSite('idle'));
    });
  }, [requestPushSite]);

  useEffect(() => {
    closeStatus(requestUpdateSite, () => {
      dispatch(projectComplexAction.getSiteList(id));
      dispatch(projectBasicAction.getTest(id));
    }, () => {
      dispatch(projectComplexAction.requestUpdateSite('idle'));
    });
  }, [requestUpdateSite]);

  useEffect(() => {
    closeStatus(requestDeleteSite, () => {
      dispatch(projectComplexAction.getSiteList(id));
      dispatch(projectBasicAction.getTest(id));
    }, () => {
      dispatch(projectComplexAction.requestDeleteSite('idle'));
    });
  }, [requestDeleteSite]);

  return (
    <ProjectComplexSiteSection
      onAdd={add}
      list={siteList}
      loading={siteListLoading}
      onUpdate={update}
      onDelete={deleteSite}
      testDetail={testDetail}
    />
  );
}