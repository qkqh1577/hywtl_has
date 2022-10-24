import ProjectBasicContributorSection from 'project_basic/view/ContributorSection';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, {
  useCallback,
  useEffect
} from 'react';
import {
  ProjectBasicExternalContributorParameter,
  ProjectBasicInternalContributorParameter
} from 'project_basic/parameter';
import { projectBasicAction } from 'project_basic/action';
import { ProjectId } from 'project/domain';
import { ProjectBasicContributorId } from 'project_basic/domain';
import { ApiStatus } from 'components/DataFieldProps';
import useDialog from 'components/Dialog';

export default function ProjectBasicContributorRoute() {

  const dispatch = useDispatch();
  const { error } = useDialog();
  const {
          id,
          internalList,
          externalList,
          requestAddInternal,
          requestUpdateInternal,
          requestDeleteInternal,
          requestAddExternal,
          requestUpdateExternal,
          requestDeleteExternal,
        } = useSelector((root: RootState) => root.projectBasic);
  const onAddInternal = useCallback((id: ProjectId) => dispatch(projectBasicAction.addInternal(id)), [dispatch]);
  const onUpdateInternal = useCallback((params: ProjectBasicInternalContributorParameter) => dispatch(projectBasicAction.updateInternal(params)), [dispatch]);
  const onDeleteInternal = useCallback((id: ProjectBasicContributorId) => dispatch(projectBasicAction.deleteInternal(id)), [dispatch]);

  const onAddExternal = useCallback((id: ProjectId) => dispatch(projectBasicAction.addExternal(id)), [dispatch]);
  const onUpdateExternal = useCallback((params: ProjectBasicExternalContributorParameter) => dispatch(projectBasicAction.updateExternal(params)), [dispatch]);
  const onDeleteExternal = useCallback((id: ProjectBasicContributorId) => dispatch(projectBasicAction.deleteExternal(id)), [dispatch]);

  useEffect(() => {
    if (requestAddInternal === ApiStatus.DONE) {
      dispatch(projectBasicAction.getInternalList(id));
      dispatch(projectBasicAction.requestAddInternal(ApiStatus.IDLE));
    }
    else if (requestAddInternal === ApiStatus.FAIL) {
      error('사내 기여자 추가에 실패했습니다.');
      dispatch(projectBasicAction.requestAddInternal(ApiStatus.IDLE));
    }
  }, [requestAddInternal]);

  useEffect(() => {
    if (requestUpdateInternal === ApiStatus.DONE) {
      dispatch(projectBasicAction.getInternalList(id));
      dispatch(projectBasicAction.requestUpdateInternal(ApiStatus.IDLE));
    }
    else if (requestUpdateInternal === ApiStatus.FAIL) {
      error('사내 기여자 변경에 실패했습니다.');
      dispatch(projectBasicAction.requestUpdateInternal(ApiStatus.IDLE));
    }
  }, [requestUpdateInternal]);

  useEffect(() => {
    if (requestDeleteInternal === ApiStatus.DONE) {
      dispatch(projectBasicAction.getInternalList(id));
      dispatch(projectBasicAction.requestDeleteInternal(ApiStatus.IDLE));
    }
    else if (requestDeleteInternal === ApiStatus.FAIL) {
      error('사내 기여자 삭제에 실패했습니다.');
      dispatch(projectBasicAction.requestDeleteInternal(ApiStatus.IDLE));
    }
  }, [requestDeleteInternal]);

  useEffect(() => {
    if (requestAddExternal === ApiStatus.DONE) {
      dispatch(projectBasicAction.getExternalList(id));
      dispatch(projectBasicAction.requestAddExternal(ApiStatus.IDLE));
    }
    else if (requestAddExternal === ApiStatus.FAIL) {
      error('사외 기여자 추가에 실패했습니다.');
      dispatch(projectBasicAction.requestAddExternal(ApiStatus.IDLE));
    }
  }, [requestAddExternal]);

  useEffect(() => {
    if (requestUpdateExternal === ApiStatus.DONE) {
      dispatch(projectBasicAction.getExternalList(id));
      dispatch(projectBasicAction.requestUpdateExternal(ApiStatus.IDLE));
    }
    else if (requestUpdateExternal === ApiStatus.FAIL) {
      error('사외 기여자 변경에 실패했습니다.');
      dispatch(projectBasicAction.requestUpdateExternal(ApiStatus.IDLE));
    }
  }, [requestUpdateExternal]);

  useEffect(() => {
    if (requestDeleteExternal === ApiStatus.DONE) {
      dispatch(projectBasicAction.getExternalList(id));
      dispatch(projectBasicAction.requestDeleteExternal(ApiStatus.IDLE));
    }
    else if (requestDeleteExternal === ApiStatus.FAIL) {
      error('사외 기여자 삭제에 실패했습니다.');
      dispatch(projectBasicAction.requestDeleteExternal(ApiStatus.IDLE));
    }
  }, [requestDeleteExternal]);


  return (
    <ProjectBasicContributorSection
      internalList={internalList}
      externalList={externalList}
      onAddInternal={() => {
        if (id) {
          onAddInternal(id);
        }
      }}
      onUpdateInternal={onUpdateInternal}
      onDeleteInternal={onDeleteInternal}
      onAddExternal={() => {
        if (id) {
          onAddExternal(id);
        }
      }}
      onUpdateExternal={onUpdateExternal}
      onDeleteExternal={onDeleteExternal}
    />
  );
}