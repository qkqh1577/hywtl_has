import { ProjectId } from 'project/domain';
import {
  ProjectComplexBuildingId,
  ProjectComplexBuildingVO,
  ProjectComplexSiteVO,
  ProjectComplexTestVO
} from 'project_complex/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectComplexActionType } from 'project_complex/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface ProjectComplexState {
  id?: ProjectId;
  siteList?: ProjectComplexSiteVO[];
  buildingList?: ProjectComplexBuildingVO[];
  buildingDetail?: ProjectComplexBuildingVO;
  requestSite: ApiStatus;
  requestBuilding: ApiStatus;
  buildingFileModal?: ProjectComplexBuildingId | undefined;
  testDetail?: ProjectComplexTestVO;
}

const initial: ProjectComplexState = {
  requestSite:     ApiStatus.IDLE,
  requestBuilding: ApiStatus.IDLE,
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
  [ProjectComplexActionType.setTestDetail]:     (state,
                                                 action
                                                ) => ({
    ...state,
    testDetail: action.payload,
  })
});