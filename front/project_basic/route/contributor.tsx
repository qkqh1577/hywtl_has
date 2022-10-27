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
import useDialog from 'dialog/hook';

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
    if (requestAddInternal === 'done') {
      dispatch(projectBasicAction.getInternalList(id));
      dispatch(projectBasicAction.requestAddInternal('idle'));
    }
    else if (requestAddInternal === message) {
      error('사내 기여자 추가에 실패했습니다.');
      dispatch(projectBasicAction.requestAddInternal('idle'));
    }
  }, [requestAddInternal]);

  useEffect(() => {
    if (requestUpdateInternal === 'done') {
      dispatch(projectBasicAction.getInternalList(id));
      dispatch(projectBasicAction.requestUpdateInternal('idle'));
    }
    else if (requestUpdateInternal === message) {
      error('사내 기여자 변경에 실패했습니다.');
      dispatch(projectBasicAction.requestUpdateInternal('idle'));
    }
  }, [requestUpdateInternal]);

  useEffect(() => {
    if (requestDeleteInternal === 'done') {
      dispatch(projectBasicAction.getInternalList(id));
      dispatch(projectBasicAction.requestDeleteInternal('idle'));
    }
    else if (requestDeleteInternal === message) {
      error('사내 기여자 삭제에 실패했습니다.');
      dispatch(projectBasicAction.requestDeleteInternal('idle'));
    }
  }, [requestDeleteInternal]);

  useEffect(() => {
    if (requestAddExternal === 'done') {
      dispatch(projectBasicAction.getExternalList(id));
      dispatch(projectBasicAction.requestAddExternal('idle'));
    }
    else if (requestAddExternal === message) {
      error('사외 기여자 추가에 실패했습니다.');
      dispatch(projectBasicAction.requestAddExternal('idle'));
    }
  }, [requestAddExternal]);

  useEffect(() => {
    if (requestUpdateExternal === 'done') {
      dispatch(projectBasicAction.getExternalList(id));
      dispatch(projectBasicAction.requestUpdateExternal('idle'));
    }
    else if (requestUpdateExternal === message) {
      error('사외 기여자 변경에 실패했습니다.');
      dispatch(projectBasicAction.requestUpdateExternal('idle'));
    }
  }, [requestUpdateExternal]);

  useEffect(() => {
    if (requestDeleteExternal === 'done') {
      dispatch(projectBasicAction.getExternalList(id));
      dispatch(projectBasicAction.requestDeleteExternal('idle'));
    }
    else if (requestDeleteExternal === message) {
      error('사외 기여자 삭제에 실패했습니다.');
      dispatch(projectBasicAction.requestDeleteExternal('idle'));
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