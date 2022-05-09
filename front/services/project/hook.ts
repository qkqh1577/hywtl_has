import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import { projectActions } from 'services/project/actions';
import Project, {
  ListProjectTargetReview,
  ProjectBasic,
  ProjectOrder,
  ProjectTarget,
  ProjectTargetDocument,
  ProjectTargetReview
} from 'services/project/entity';
import {
  ProjectBasicParameter,
  ProjectOrderParameter,
  ProjectQuery,
  ProjectTargetDocumentAddParameter,
  ProjectTargetDocumentChangeParameter,
  ProjectTargetParameter,
  ProjectTargetReviewParameter
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

  const add = useCallback(
    (params: ProjectBasicParameter, callback: (data?: Project) => void) =>
      dispatch(projectActions.add({ params, callback })),
    [dispatch]
  );

  const setAddModal = useCallback(
    (open: boolean) =>
      dispatch(projectActions.setAddModal(open)),
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

  const updateBasic = useCallback(
    (projectId: number, params: ProjectBasicParameter, callback: (data?: ProjectBasic) => void) =>
      dispatch(projectActions.updateBasic({ projectId, params, callback })),
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

  const updateOrder = useCallback(
    (projectId: number, params: ProjectOrderParameter, callback: (data?: ProjectOrder) => void) =>
      dispatch(projectActions.updateOrder({ projectId, params, callback })),
    [dispatch]
  );

  const getTarget = useCallback(
    (projectId: number) =>
      dispatch(projectActions.getTarget(projectId)),
    [dispatch]
  );

  const setTarget = useCallback(
    (data: ProjectTarget) =>
      dispatch(projectActions.setTarget(data)),
    [dispatch]
  );

  const clearTarget = useCallback(
    () =>
      dispatch(projectActions.setTarget(undefined)),
    [dispatch]
  );

  const updateTarget = useCallback(
    (projectId: number, params: ProjectTargetParameter, callback: (data?: ProjectTarget) => void) =>
      dispatch(projectActions.updateTarget({ projectId, params, callback })),
    [dispatch]
  );

  const getTargetReviewList = useCallback(
    (projectId: number) =>
      dispatch(projectActions.getTargetReviewList(projectId)),
    [dispatch]
  );

  const setTargetReviewList = useCallback(
    (list: ListProjectTargetReview[]) =>
      dispatch(projectActions.setTargetReviewList(list)),
    [dispatch],
  );

  const clearTargetReviewList = useCallback(
    () =>
      dispatch(projectActions.setTargetReviewList(undefined)),
    [dispatch],
  );

  const getTargetReview = useCallback(
    (reviewId: number) =>
      dispatch(projectActions.getTargetReview(reviewId)),
    [dispatch]
  );

  const setTargetReview = useCallback(
    (data: ProjectTargetReview) =>
      dispatch(projectActions.setTargetReview(data)),
    [dispatch]
  );

  const clearTargetReview = useCallback(
    () =>
      dispatch(projectActions.setTargetReview(undefined)),
    [dispatch]
  );

  const addTargetReview = useCallback(
    (projectId: number, params: ProjectTargetReviewParameter, callback: (data?: ProjectTargetReview) => void) =>
      dispatch(projectActions.addTargetReview({ projectId, params, callback })),
    [dispatch]
  );

  const confirmTargetReview = useCallback(
    (id: number, callback: (list?: ListProjectTargetReview[]) => void) =>
      dispatch(projectActions.confirmTargetReview({ id, callback })),
    [dispatch]
  );

  const updateTargetReview = useCallback(
    (id: number, params: ProjectTargetReviewParameter, callback: (data?: ProjectTargetReview) => void) =>
      dispatch(projectActions.updateTargetReview({ id, params, callback })),
    [dispatch]
  );

  const removeTargetReview = useCallback(
    (id: number, callback: () => void) =>
      dispatch(projectActions.removeTargetReview({ id, callback })),
    [dispatch]
  );

  const setTargetReviewModal = useCallback(
    (reviewId: number | null) =>
      dispatch(projectActions.setTargetReviewModal(reviewId)),
    [dispatch],
  );

  const clearTargetReviewModal = useCallback(
    () =>
      dispatch(projectActions.setTargetReviewModal(undefined)),
    [dispatch]
  );

  const getTargetDocumentList = useCallback(
    (projectId: number) =>
      dispatch(projectActions.getTargetDocumentList(projectId)),
    [dispatch]
  );

  const addTargetDocument = useCallback(
    (projectId: number, params: ProjectTargetDocumentAddParameter, callback: (list?: ProjectTargetDocument[]) => void) =>
      dispatch(projectActions.addTargetDocument({ projectId, params, callback })),
    [dispatch]
  );

  const updateTargetDocument = useCallback(
    (id: number, params: ProjectTargetDocumentChangeParameter, callback: () => void) =>
      dispatch(projectActions.updateTargetDocument({ id, params, callback })),
    [dispatch]
  );

  return {
    projectState,
    getPage,
    getOne,
    clearOne,
    add,
    setAddModal,
    getBasic,
    setBasic,
    clearBasic,
    updateBasic,
    getOrder,
    setOrder,
    clearOrder,
    updateOrder,
    getTarget,
    setTarget,
    clearTarget,
    updateTarget,
    getTargetReviewList,
    setTargetReviewList,
    clearTargetReviewList,
    getTargetReview,
    setTargetReview,
    clearTargetReview,
    addTargetReview,
    confirmTargetReview,
    updateTargetReview,
    removeTargetReview,
    setTargetReviewModal,
    clearTargetReviewModal,
    getTargetDocumentList,
    addTargetDocument,
    updateTargetDocument,
  };
}
