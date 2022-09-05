import { ProjectId } from 'project/domain';
import {
  ProjectComplexBuildingId,
  ProjectComplexBuildingVO,
  ProjectComplexSiteVO
} from 'project_complex/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectComplexActionType } from 'project_complex/action';

export interface ProjectComplexState {
  id?: ProjectId;
  siteList?: ProjectComplexSiteVO[];
  buildingList?: ProjectComplexBuildingVO[];
  buildingDetail?: ProjectComplexBuildingVO;
  requestSite: string;
  requestBuilding: string;
  buildingFileModal?: ProjectComplexBuildingId | undefined;
}

const initial: ProjectComplexState = {
  requestSite:     'idle',
  requestBuilding: 'idle',
};

export const projectComplexReducer = createReducer(initial, {
  [ProjectComplexActionType.setId]:             (state,
                                                 action
                                                ) => ({
    ...state,
    id: action.payload,
  }),
  [ProjectComplexActionType.setSiteList]:       (state,
                                                 action
                                                ) => ({
    ...state,
    siteList: action.payload,
  }),
  [ProjectComplexActionType.setBuildingList]:   (state,
                                                 action
                                                ) => ({
    ...state,
    buildingList: action.payload,
  }),
  [ProjectComplexActionType.setBuilding]:       (state,
                                                 action
                                                ) => ({
    ...state,
    buildingDetail: action.payload,
  }),
  [ProjectComplexActionType.buildingFileModal]: (state,
                                                 action
                                                ) => ({
    ...state,
    buildingFileModal: action.payload,
  }),
  [ProjectComplexActionType.requestSite]:       (state,
                                                 action
                                                ) => ({
    ...state,
    requestSite: action.payload,
  }),
  [ProjectComplexActionType.requestBuilding]:   (state,
                                                 action
                                                ) => ({
    ...state,
    requestBuilding: action.payload,
  }),
});