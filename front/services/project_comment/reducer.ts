import { createReducer } from 'typesafe-actions';
import Page, { initial } from 'services/common/domain/Page';
import {
  ProjectComment,
  ProjectCommentActionType,
} from 'services/project_comment';

export type ProjectCommentState = {
  page: Page<ProjectComment>;
  detail?: ProjectComment;
}

const initState: ProjectCommentState = {
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
