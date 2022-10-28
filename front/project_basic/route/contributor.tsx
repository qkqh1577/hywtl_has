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
import { closeStatus } from 'components/DataFieldProps';

export default function ProjectBasicContributorRoute() {

  const dispatch = useDispatch();
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
    closeStatus(requestAddInternal, () => {
      dispatch(projectBasicAction.getInternalList(id));
    }, () => {
      dispatch(projectBasicAction.requestAddInternal('idle'));
    });
  }, [requestAddInternal]);

  useEffect(() => {
    closeStatus(requestUpdateInternal, () => {
      dispatch(projectBasicAction.getInternalList(id));
    }, () => {
      dispatch(projectBasicAction.requestUpdateInternal('idle'));
    });
  }, [requestUpdateInternal]);

  useEffect(() => {
    closeStatus(requestDeleteInternal, () => {
      dispatch(projectBasicAction.getInternalList(id));
    }, () => {
      dispatch(projectBasicAction.requestDeleteInternal('idle'));
    });
  }, [requestDeleteInternal]);

  useEffect(() => {
    closeStatus(requestAddExternal, () => {
      dispatch(projectBasicAction.getExternalList(id));
    }, () => {
      dispatch(projectBasicAction.requestAddExternal('idle'));
    });
  }, [requestAddExternal]);

  useEffect(() => {
    closeStatus(requestUpdateExternal, () => {
      dispatch(projectBasicAction.getExternalList(id));
    }, () => {
      dispatch(projectBasicAction.requestUpdateExternal('idle'));
    });
  }, [requestUpdateExternal]);

  useEffect(() => {
    closeStatus(requestDeleteExternal, () => {
      dispatch(projectBasicAction.getExternalList(id));
    }, () => {
      dispatch(projectBasicAction.requestDeleteExternal('idle'));
    });
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