import { ProjectId } from 'project/domain';
import {
  ProjectComplexBuildingVO,
  ProjectComplexSiteVO
} from 'project_complex/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectComplexActionType } from 'project_complex/action';

export interface ProjectComplexState {
  id?: ProjectId;
  siteList?: ProjectComplexSiteVO[];
  buildingList?: ProjectComplexBuildingVO[];
  requestSite: string;
}

const initial: ProjectComplexState = {
  requestSite: 'idle',
};

export const projectComplexReducer = createReducer(initial, {
  [ProjectComplexActionType.setId]:           (state,
                                               action
                                              ) => ({
    ...state,
    id: action.payload,
  }),
  [ProjectComplexActionType.setSiteList]:     (state,
                                               action
                                              ) => ({
    ...state,
    siteList: action.payload,
  }),
  [ProjectComplexActionType.setBuildingList]: (state,
                                               action
                                              ) => ({
    ...state,
    buildingList: action.payload,
  })
});