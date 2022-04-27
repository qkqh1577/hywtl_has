import Page, { initial } from 'components/Page';
import ProjectComment from 'services/project_comment/entity';
import { createReducer } from 'typesafe-actions';
import { ProjectCommentActionType } from 'services/project_comment/actions';

export type ProjectCommentState = {
  page: Page<ProjectComment>;
  detail?: ProjectComment;
}

export const initState: ProjectCommentState = {
  page: initial,
};

const projectCommentReducer = createReducer(initState, {
  [ProjectCommentActionType.setPage]: (state, action) => ({
    ...state,
    page: action.payload,
  }),
  [ProjectCommentActionType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload,
  }),
});

export default projectCommentReducer;
