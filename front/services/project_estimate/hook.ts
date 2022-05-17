import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import {
  ProjectEstimateParameter,
  ProjectEstimateState,
  projectEstimateActions,
} from 'services/project_estimate';

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

  const getSheetList = useCallback(
    (projectId: number) =>
      dispatch(projectEstimateActions.getSheetList(projectId)),
    [dispatch]
  );

  const clearSheetList = useCallback(
    () =>
      dispatch(projectEstimateActions.setSheetList(undefined)),
    [dispatch]
  );

  const getSheetOne = useCallback(
    (sheetId: number) =>
      dispatch(projectEstimateActions.getSheetOne(sheetId)),
    [dispatch]
  );
  const clearSheetOne = useCallback(
    () =>
      dispatch(projectEstimateActions.setSheetOne(undefined)),
    [dispatch]
  );

  const setSheetId = useCallback(
    (sheetId: number | null) =>
      dispatch(projectEstimateActions.setSheetId(sheetId)),
    [dispatch]
  );

  const clearSheetId = useCallback(
    () =>
      dispatch(projectEstimateActions.setSheetId(undefined)),
    [dispatch],
  );

  return {
    state,
    getOne,
    clearOne,
    upsert,
    getSheetList,
    clearSheetList,
    getSheetOne,
    clearSheetOne,
    setSheetId,
    clearSheetId,
  };
}
