import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import { projectActions } from 'services/project/actions';
import Project, { ProjectBasic, ProjectOrder } from 'services/project/entity';
import {
  ProjectBasicParameter,
  ProjectOrderParameter,
  ProjectQuery
} from 'services/project/parameter';

export default function useProject() {
  const projectState = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();

  const getPage = useCallback(
    (query: ProjectQuery) =>
      dispatch(projectActions.getPage(query)),
    [dispatch]
  );

  const getOne = useCallback(
    (id: number) =>
      dispatch(projectActions.getOne(id)),
    [dispatch]
  );

  const clearOne = useCallback(
    () =>
      dispatch(projectActions.setOne(undefined)),
    [dispatch]
  );

  const getBasic = useCallback(
    (projectId: number) =>
      dispatch(projectActions.getBasic(projectId)),
    [dispatch]
  );

  const setBasic = useCallback(
    (data: ProjectBasic) =>
      dispatch(projectActions.setBasic(data)),
    [dispatch]
  );

  const clearBasic = useCallback(
    () =>
      dispatch(projectActions.setBasic(undefined)),
    [dispatch]
  );

  const getOrder = useCallback(
    (projectId: number) =>
      dispatch(projectActions.getOrder(projectId)),
    [dispatch]
  );

  const setOrder = useCallback(
    (data: ProjectOrder) =>
      dispatch(projectActions.setOrder(data)),
    [dispatch]
  );

  const clearOrder = useCallback(
    () =>
      dispatch(projectActions.setOrder(undefined)),
    [dispatch]
  );

  const add = useCallback(
    (params: ProjectBasicParameter, callback: (data?: Project) => void) =>
      dispatch(projectActions.add({ params, callback })),
    [dispatch]
  );

  const updateBasic = useCallback(
    (projectId: number, params: ProjectBasicParameter, callback: (data?: ProjectBasic) => void) =>
      dispatch(projectActions.updateBasic({ projectId, params, callback })),
    [dispatch]
  );

  const updateOrder = useCallback(
    (projectId: number, params: ProjectOrderParameter, callback: (data?: ProjectOrder) => void) =>
      dispatch(projectActions.updateOrder({ projectId, params, callback })),
    [dispatch]
  );

  const setAddModal = useCallback(
    (open: boolean) =>
      dispatch(projectActions.setAddModal(open)),
    [dispatch]
  );

  return {
    projectState,
    getPage,
    getOne,
    clearOne,
    getBasic,
    setBasic,
    clearBasic,
    getOrder,
    setOrder,
    clearOrder,
    add,
    updateBasic,
    updateOrder,
    setAddModal
  };
}
