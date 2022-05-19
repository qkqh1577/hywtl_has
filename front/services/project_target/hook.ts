import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import {
  ProjectTargetDocumentAddParameter,
  ProjectTargetDocumentChangeParameter,
  projectTargetActions,
} from 'services/project_target';

export default function useProjectTarget() {
  const state = useSelector((state: RootState) => state.projectTarget);
  const dispatch = useDispatch();


  const getDocumentList = useCallback(
    (projectId: number) =>
      dispatch(projectTargetActions.getDocumentList(projectId)),
    [dispatch]
  );

  const clearDocumentList = useCallback(
    () =>
      dispatch(projectTargetActions.setDocumentList(undefined)),
    [dispatch]
  );

  const getDocument = useCallback(
    (id: number) =>
      dispatch(projectTargetActions.getDocument(id)),
    [dispatch]
  );

  const clearDocument = useCallback(
    () =>
      dispatch(projectTargetActions.setDocument(undefined)),
    [dispatch]
  );

  const addDocument = useCallback(
    (projectId: number, params: ProjectTargetDocumentAddParameter, callback: () => void) =>
      dispatch(projectTargetActions.addDocument({ projectId, params, callback })),
    [dispatch]
  );

  const updateDocument = useCallback(
    (id: number, params: ProjectTargetDocumentChangeParameter, callback: () => void) =>
      dispatch(projectTargetActions.updateDocument({ id, params, callback })),
    [dispatch]
  );

  const removeDocument = useCallback(
    (id: number, callback: () => void) =>
      dispatch(projectTargetActions.removeDocument({ id, callback })),
    [dispatch]
  );

  const setDocumentId = useCallback(
    (documentId: number | null) =>
      dispatch(projectTargetActions.setDocumentId(documentId)),
    [dispatch]
  );

  const clearDocumentId = useCallback(
    () =>
      dispatch(projectTargetActions.setDocumentId(undefined)),
    [dispatch]
  );

  return {
    state,
    getDocumentList,
    clearDocumentList,
    getDocument,
    clearDocument,
    addDocument,
    updateDocument,
    removeDocument,
    setDocumentId,
    clearDocumentId
  };
}