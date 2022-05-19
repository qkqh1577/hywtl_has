import { createReducer } from 'typesafe-actions';
import {
  ListProjectTarget,
  ProjectTarget,
  ProjectTargetActionType,
} from 'services/project_target';

export type ProjectTargetState = {
  id?: number | null;
  list?: ListProjectTarget[];
  detail?: ProjectTarget;
}

const initState: ProjectTargetState = {};
const projectTargetReducer = createReducer(initState, {
  [ProjectTargetActionType.setId]: (state, action) => ({
    ...state,
    id: action.payload,
  }),
  [ProjectTargetActionType.setList]: (state, action) => ({
    ...state,
    list: action.payload,
  }),
  [ProjectTargetActionType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload,
  }),
});

export default projectTargetReducer;
