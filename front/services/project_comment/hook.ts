import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import {
  ProjectComment,
  ProjectCommentAddParameter,
  ProjectCommentChangeParameter,
  ProjectCommentQuery,
  projectCommentActions,
} from 'services/project_comment';

export default function useProjectComment() {
  const state = useSelector((state: RootState) => state.projectComment);
  const dispatch = useDispatch();

  const getPage = useCallback(
    (query: ProjectCommentQuery) =>
      dispatch(projectCommentActions.getPage(query)),
    [dispatch]
  );

  const getOne = useCallback(
    (id: number) =>
      dispatch(projectCommentActions.getOne(id)),
    [dispatch],
  );

  const clearOne = useCallback(
    () =>
      dispatch(projectCommentActions.setOne(undefined)),
    [dispatch],
  );

  const add = useCallback(
    (params: ProjectCommentAddParameter, callback: (data?: ProjectComment) => void) =>
      dispatch(projectCommentActions.add({ params, callback })),
    [dispatch],
  );

  const change = useCallback(
    (params: ProjectCommentChangeParameter, callback: (data?: ProjectComment) => void) =>
      dispatch(projectCommentActions.change({ params, callback })),
    [dispatch]
  );

  const remove = useCallback(
    (id: number, callback: () => void) =>
      dispatch(projectCommentActions.remove({ id, callback })),
    [dispatch],
  );


  return {
    state,
    getPage,
    getOne,
    clearOne,
    add,
    change,
    remove
  };
}
