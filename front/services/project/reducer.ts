import Page, { initial } from 'components/Page';
import Project, { ListProject } from 'services/project/entity';
import { createReducer } from 'typesafe-actions';
import { ProjectActionType } from 'services/project/actions';

export type ProjectState = {
  page: Page<ListProject>;
  detail?: Project;
}

export const initState: ProjectState = {
  page: initial,
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
});

export default projectReducer;
