import { createReducer } from 'typesafe-actions';
import {
  ListProjectTargetReview,
  ProjectTargetActionType,
  ProjectTargetDocument,
  ProjectTargetReview,
} from 'services/project_target';

export type ProjectTargetState = {
  reviewId?: number | null;
  reviewList?: ListProjectTargetReview[];
  reviewDetail?: ProjectTargetReview;

  documentId?: number | null;
  documentList?: ProjectTargetDocument[];
  documentDetail?: ProjectTargetDocument;
}

const initState: ProjectTargetState = {};
const projectTargetReducer = createReducer(initState, {
  [ProjectTargetActionType.setReviewId]: (state, action) => ({
    ...state,
    reviewId: action.payload,
  }),
  [ProjectTargetActionType.setReviewList]: (state, action) => ({
    ...state,
    reviewList: action.payload,
  }),
  [ProjectTargetActionType.setReview]: (state, action) => ({
    ...state,
    reviewDetail: action.payload,
  }),
  [ProjectTargetActionType.setDocumentId]: (state, action) => ({
    ...state,
    documentId: action.payload,
  }),
  [ProjectTargetActionType.setDocumentList]: (state, action) => ({
    ...state,
    documentList: action.payload,
  }),
  [ProjectTargetActionType.setDocument]: (state, action) => ({
    ...state,
    documentDetail: action.payload,
  }),
});

export default projectTargetReducer;
