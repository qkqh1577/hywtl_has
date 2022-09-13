import { ProjectId } from 'project/domain';
import { ProjectBasicBusiness } from 'project_basic/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectBasicActionType } from 'project_basic/action';

export interface ProjectBasicState {
  id?: ProjectId;
  businessList?: ProjectBasicBusiness[];

}

const initial: ProjectBasicState = {};

export const projectBasicReducer = createReducer(initial, {
  [ProjectBasicActionType.setId]:           (state,
                                             action
                                            ) => ({
    ...state,
    id: action.payload,
  }),
  [ProjectBasicActionType.setBusinessList]: (state,
                                             action
                                            ) => ({
    ...state,
    businessList: action.payload,
  })
});