import { ProjectEstimateState } from 'services/project_estimate/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import { useCallback } from 'react';
import { projectEstimateActions } from 'services/project_estimate/actions';
import { ProjectEstimateParameter } from 'services/project_estimate/parameter';

export default function useProjectEstimate() {
  const state: ProjectEstimateState = useSelector((state: RootState) => state.projectEstimate);
  const dispatch = useDispatch();

  const getOne = useCallback(
    (projectId: number) =>
      dispatch(projectEstimateActions.getOne(projectId)),
    [dispatch]
  );

  const clearOne = useCallback(
    () =>
      dispatch(projectEstimateActions.setOne(undefined)),
    [dispatch]
  );

  const upsert = useCallback(
    (params: ProjectEstimateParameter, callback: () => void) =>
      dispatch(projectEstimateActions.upsert({ params, callback })),
    [dispatch]
  );

  return {
    state,
    getOne,
    clearOne,
    upsert,
  };
}
