import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import {
  ProjectTarget,
  ProjectTargetDocumentAddParameter,
  ProjectTargetDocumentChangeParameter,
  ProjectTargetParameter,
  ProjectTargetReviewParameter,
  projectTargetActions,
} from 'services/project_target';

export default function useProjectTarget() {
  const state = useSelector((state: RootState) => state.projectTarget);
  const dispatch = useDispatch();

  const getOne = useCallback(
    (projectId: number) =>
      dispatch(projectTargetActions.getOne(projectId)),
    [dispatch]
  );

  const setOne = useCallback(
    (data: ProjectTarget) =>
      dispatch(projectTargetActions.setOne(data)),
    [dispatch]
  );

  const clearOne = useCallback(
    () =>
      dispatch(projectTargetActions.setOne(undefined)),
    [dispatch]
  );

  const update = useCallback(
    (projectId: number, params: ProjectTargetParameter, callback: () => void) =>
      dispatch(projectTargetActions.update({ projectId, params, callback })),
    [dispatch]
  );

  const getReviewList = useCallback(
    (projectId: number) =>
      dispatch(projectTargetActions.getReviewList(projectId)),
    [dispatch]
  );

  const clearReviewList = useCallback(
    () =>
      dispatch(projectTargetActions.setReviewList(undefined)),
    [dispatch],
  );

  const getReview = useCallback(
    (reviewId: number) =>
      dispatch(projectTargetActions.getReview(reviewId)),
    [dispatch]
  );

  const clearReview = useCallback(
    () =>
      dispatch(projectTargetActions.setReview(undefined)),
    [dispatch]
  );

  const addReview = useCallback(
    (projectId: number, params: ProjectTargetReviewParameter, callback: () => void) =>
      dispatch(projectTargetActions.addReview({ projectId, params, callback })),
    [dispatch]
  );


  const updateReview = useCallback(
    (id: number, params: ProjectTargetReviewParameter, callback: () => void) =>
      dispatch(projectTargetActions.updateReview({ id, params, callback })),
    [dispatch]
  );

  const removeReview = useCallback(
    (id: number, callback: () => void) =>
      dispatch(projectTargetActions.removeReview({ id, callback })),
    [dispatch]
  );

  const confirmReview = useCallback(
    (id: number, callback: () => void) =>
      dispatch(projectTargetActions.confirmReview({ id, callback })),
    [dispatch]
  );

  const setReviewId = useCallback(
    (reviewId: number | null) =>
      dispatch(projectTargetActions.setReviewId(reviewId)),
    [dispatch],
  );

  const clearReviewId = useCallback(
    () =>
      dispatch(projectTargetActions.setReviewId(undefined)),
    [dispatch]
  );

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
    getOne,
    setOne,
    clearOne,
    update,
    getReviewList,
    clearReviewList,
    getReview,
    clearReview,
    addReview,
    updateReview,
    removeReview,
    confirmReview,
    setReviewId,
    clearReviewId,
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