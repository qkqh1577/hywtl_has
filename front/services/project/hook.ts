import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import {
  ProjectBasicParameter,
  ProjectBuildingParameter,
  ProjectQuery
} from 'services/project/parameter';
import { projectActions } from 'services/project/actions';
import Project, { ProjectBasic, ProjectBuilding } from 'services/project/entity';

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

  const getBuilding = useCallback(
    (projectId: number) =>
      dispatch(projectActions.getBuilding(projectId)),
    [dispatch]
  );

  const setBuilding = useCallback(
    (data: ProjectBuilding) =>
      dispatch(projectActions.setBuilding(data)),
    [dispatch]
  );

  const clearBuilding = useCallback(
    () =>
      dispatch(projectActions.setBuilding(undefined)),
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

  const updateBuilding = useCallback(
    (projectId: number, params: ProjectBuildingParameter, callback: (data?: ProjectBuilding) => void) =>
      dispatch(projectActions.updateBuilding({ projectId, params, callback })),
    [dispatch]
  );

  const getAddModal = useCallback(
    () =>
      dispatch(projectActions.getAddModal()),
    [dispatch],
  );

  const setAddModal = useCallback(
    (modal: boolean) =>
      dispatch(projectActions.setAddModal(modal)),
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
    getBuilding,
    setBuilding,
    clearBuilding,
    add,
    updateBasic,
    updateBuilding,
    getAddModal,
    setAddModal
  };
}
