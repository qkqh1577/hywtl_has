import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import { ProjectAddParameter, ProjectQuery } from 'services/project/parameter';
import { projectActions } from 'services/project/actions';
import Project from 'services/project/entity';

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

  const add = useCallback(
    (params: ProjectAddParameter, callback: (data?: Project) => void) =>
      dispatch(projectActions.add({ params, callback })),
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
    add,
    getAddModal,
    setAddModal
  };
}
