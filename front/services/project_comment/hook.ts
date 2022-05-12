import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import { useCallback } from 'react';
import {
  ProjectCommentAddParameter, ProjectCommentChangeParameter,
  ProjectCommentQuery
} from 'services/project_comment/parameter';
import { projectCommentActions } from 'services/project_comment/actions';
import ProjectComment from 'services/project_comment/entity';

export default function useProjectComment() {
  const projectCommentState = useSelector((state: RootState) => state.projectComment);
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
    projectCommentState,
    getPage,
    getOne,
    clearOne,
    add,
    change,
    remove
  };
}
