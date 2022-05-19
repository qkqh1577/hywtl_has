import { createReducer } from 'typesafe-actions';
import {
  ListProjectReview,
  ProjectReview,
  ProjectReviewActionType
} from 'services/project_review';

export type ProjectReviewState = {
  id?: number | null;
  list?: ListProjectReview[];
  detail?: ProjectReview;
}

const initState: ProjectReviewState = {};
const projectReviewReducer = createReducer(initState, {
  [ProjectReviewActionType.setId]: (state, action) => ({
    ...state,
    id: action.payload,
  }),
  [ProjectReviewActionType.setList]: (state, action) => ({
    ...state,
    list: action.payload,
  }),
  [ProjectReviewActionType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload,
  }),
});

export default projectReviewReducer;
