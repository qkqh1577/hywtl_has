import { createReducer } from 'typesafe-actions';
import Page, { initial } from 'components/Page';
import {
  ListProject,
  Project,
  ProjectActionType,
  ProjectBasic,
  ProjectOrder,
} from 'services/project';

export type ProjectState = {
  page: Page<ListProject>;
  detail?: Project;
  basic?: ProjectBasic;
  order?: ProjectOrder;
  addModal: boolean;
}

const initState: ProjectState = {
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
});

export default projectReducer;
