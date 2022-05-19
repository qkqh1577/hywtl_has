import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import {
  ProjectTargetParameter,
  projectTargetActions,
} from 'services/project_target';

export default function useProjectTarget() {
  const state = useSelector((state: RootState) => state.projectTarget);
  const dispatch = useDispatch();


  const getList = useCallback(
    (projectId: number) =>
      dispatch(projectTargetActions.getList(projectId)),
    [dispatch]
  );

  const clearList = useCallback(
    () =>
      dispatch(projectTargetActions.setList(undefined)),
    [dispatch]
  );

  const getOne = useCallback(
    (id: number) =>
      dispatch(projectTargetActions.getOne(id)),
    [dispatch]
  );

  const clearOne = useCallback(
    () =>
      dispatch(projectTargetActions.setOne(undefined)),
    [dispatch]
  );

  const add = useCallback(
    (projectId: number, params: ProjectTargetParameter, callback: () => void) =>
      dispatch(projectTargetActions.add({ projectId, params, callback })),
    [dispatch]
  );

  const update = useCallback(
    (id: number, params: ProjectTargetParameter, callback: () => void) =>
      dispatch(projectTargetActions.update({ id, params, callback })),
    [dispatch]
  );

  const remove = useCallback(
    (id: number, callback: () => void) =>
      dispatch(projectTargetActions.remove({ id, callback })),
    [dispatch]
  );

  const setId = useCallback(
    (id: number | null) =>
      dispatch(projectTargetActions.setId(id)),
    [dispatch]
  );

  const clearId = useCallback(
    () =>
      dispatch(projectTargetActions.setId(undefined)),
    [dispatch]
  );

  return {
    state,
    getList,
    clearList,
    getOne,
    clearOne,
    add,
    update,
    remove,
    setId,
    clearId
  };
}