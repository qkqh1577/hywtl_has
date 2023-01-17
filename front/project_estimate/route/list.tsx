import ProjectEstimateListSection from 'project_estimate/view/EstimateList';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectEstimateAction } from 'project_estimate/action';
import {
  ProjectEstimateId,
  ProjectEstimateType
} from 'project_estimate/domain';
import { ProjectFinalEstimateParameter } from 'project_estimate/parameter';
import { closeStatus } from 'components/DataFieldProps';


export default function ProjectEstimateListRoute() {

  const dispatch = useDispatch();
  const { list, finalEstimate, requestUpdateFinalEstimate, projectId } = useSelector((root: RootState) => root.projectEstimate);
  const openCustomAddModal = useCallback((type: ProjectEstimateType) => dispatch(projectEstimateAction.setCustomAddModal(type)), [dispatch]);
  const openCustomDetailModal = useCallback((id: ProjectEstimateId) => dispatch(projectEstimateAction.setCustomDetailModal(id)), [dispatch]);
  const openSystemAddModal = useCallback(() => dispatch(projectEstimateAction.setSystemModal(null)), [dispatch]);
  const openSystemDetailModal = useCallback((id: ProjectEstimateId) => dispatch(projectEstimateAction.setSystemModal(id)), [dispatch]);
  const openFinalModal = useCallback(() => dispatch(projectEstimateAction.setFinalModal(true)), [dispatch]);
  const onUpdate = useCallback((params: ProjectFinalEstimateParameter) => dispatch(projectEstimateAction.update(params)), [dispatch]);
  const [codeList, setCodeList] = useState<string[]>(list?.map((item) => item.code) || []);
  useEffect(() => {
    if (localStorage.getItem('custom')) {
      openCustomDetailModal(ProjectEstimateId(Number(localStorage.getItem('custom'))));
      localStorage.removeItem('custom');
    }
  }, [localStorage.getItem('custom')]);

  useEffect(() => {
    if (localStorage.getItem('system')) {
      openSystemDetailModal(ProjectEstimateId(Number(localStorage.getItem('system'))));
      localStorage.removeItem('system');
    }
  }, [localStorage.getItem('system')]);

  useEffect(() => {
    closeStatus(requestUpdateFinalEstimate,
      () => {
        if (projectId) {
          dispatch(projectEstimateAction.getFinalEstimate(projectId));
        }
      },
      () => {
        dispatch(projectEstimateAction.requestFinalEstimateUpdate('idle'));
      });
  }, [requestUpdateFinalEstimate]);

  useEffect(() => {
    if (projectId) {
      dispatch(projectEstimateAction.getFinalEstimate(projectId));
    }
  }, [projectId]);

  useEffect(() => {
    setCodeList(list?.map((item) => item.code) || []);
  }, [list]);

  return (
    <ProjectEstimateListSection
      list={list}
      codeList={codeList}
      onUpdate={onUpdate}
      finalEstimate={finalEstimate}
      openCustomAddModal={openCustomAddModal}
      openCustomDetailModal={openCustomDetailModal}
      openSystemAddModal={openSystemAddModal}
      openSystemDetailModal={openSystemDetailModal}
      openFinalModal={openFinalModal}
    />
  );
}
