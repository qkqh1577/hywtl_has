import Page, { initial } from 'components/Page';
import Project, { ListProject, ProjectBasic } from 'services/project/entity';
import { createReducer } from 'typesafe-actions';
import { ProjectActionType } from 'services/project/actions';

export type ProjectState = {
  page: Page<ListProject>;
  detail?: Project;
  basic?: ProjectBasic;
  addModal: boolean;
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
  [ProjectActionType.setBasic]: (state, action) => ({
    ...state,
    basic: action.payload,
  }),
  [ProjectActionType.setAddModal]: (state, action) => ({
    ...state,
    addModal: action.payload,
  }),
});

export default projectReducer;
