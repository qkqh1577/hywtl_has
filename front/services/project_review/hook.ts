import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import {
  ProjectReviewParameter,
  projectReviewActions,
} from 'services/project_review';

export default function useProjectReview() {
  const state = useSelector((state: RootState) => state.projectReview);
  const dispatch = useDispatch();

  const getList = useCallback(
    (projectId: number) =>
      dispatch(projectReviewActions.getList(projectId)),
    [dispatch]
  );

  const clearList = useCallback(
    () =>
      dispatch(projectReviewActions.setList(undefined)),
    [dispatch],
  );

  const getOne = useCallback(
    (reviewId: number) =>
      dispatch(projectReviewActions.getOne(reviewId)),
    [dispatch]
  );

  const clearOne = useCallback(
    () =>
      dispatch(projectReviewActions.setOne(undefined)),
    [dispatch]
  );

  const add = useCallback(
    (projectId: number, params: ProjectReviewParameter, callback: () => void) =>
      dispatch(projectReviewActions.add({ projectId, params, callback })),
    [dispatch]
  );


  const update = useCallback(
    (id: number, params: ProjectReviewParameter, callback: () => void) =>
      dispatch(projectReviewActions.update({ id, params, callback })),
    [dispatch]
  );

  const remove = useCallback(
    (id: number, callback: () => void) =>
      dispatch(projectReviewActions.remove({ id, callback })),
    [dispatch]
  );

  const setId = useCallback(
    (reviewId: number | null) =>
      dispatch(projectReviewActions.setId(reviewId)),
    [dispatch],
  );

  const clearId = useCallback(
    () =>
      dispatch(projectReviewActions.setId(undefined)),
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
    clearId,
  };
}
