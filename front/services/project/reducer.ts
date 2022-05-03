import Page, { initial } from 'components/Page';
import Project, {
  ListProject,
  ProjectBasic,
  ProjectOrder,
  ProjectTarget,
  ProjectTargetDocument,
  ProjectTargetReview
} from 'services/project/entity';
import { createReducer } from 'typesafe-actions';
import { ProjectActionType } from 'services/project/actions';

export type ProjectState = {
  page: Page<ListProject>;
  detail?: Project;
  basic?: ProjectBasic;
  order?: ProjectOrder;
  addModal: boolean;
  target?: ProjectTarget;
  reviewList?: ProjectTargetReview[];
  documentList?: ProjectTargetDocument[];
}

export const initState: ProjectState = {
  page: initial,
  addModal: false,
};

const projectReducer = createReducer(initState, {
  [ProjectActionType.setPage]: (state, action) => ({
    ...state,
    page: action.payload,
  }),
  [ProjectActionType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectActionType.setAddModal]: (state, action) => ({
    ...state,
    addModal: action.payload
  }),
  [ProjectActionType.setBasic]: (state, action) => ({
    ...state,
    basic: action.payload,
  }),
  [ProjectActionType.setOrder]: (state, action) => ({
    ...state,
    order: action.payload,
  }),
  [ProjectActionType.setTarget]: (state, action) => ({
    ...state,
    target: action.payload,
  }),
  [ProjectActionType.setTargetReviewList]: (state, action) => ({
    ...state,
    reviewList: action.payload,
  }),
  [ProjectActionType.setTargetDocumentList]: (state, action) => ({
    ...state,
    documentList: action.payload,
  }),
});

export default projectReducer;
