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
  buildingFileModal?: ProjectComplexBuildingId | undefined;
  testDetail?: ProjectComplexTestVO;

  requestPushSite: ApiStatus;
  requestUpdateSite: ApiStatus;
  requestDeleteSite: ApiStatus;

  requestPushBuilding: ApiStatus;
  requestUpdateBuilding: ApiStatus;
  requestDeleteBuilding: ApiStatus;
}

const initial: ProjectComplexState = {
  requestPushSite:   'idle',
  requestUpdateSite: 'idle',
  requestDeleteSite: 'idle',

  requestPushBuilding:   'idle',
  requestUpdateBuilding: 'idle',
  requestDeleteBuilding: 'idle',
};

export const projectComplexReducer = createReducer(initial, {
  [ProjectComplexActionType.setId]:                 (state,
                                                     action
                                                    ) => ({
    ...state,
    id: action.payload,
  }),
  [ProjectComplexActionType.setSiteList]:           (state,
                                                     action
                                                    ) => ({
    ...state,
    siteList: action.payload,
  }),
  [ProjectComplexActionType.setBuildingList]:       (state,
                                                     action
                                                    ) => ({
    ...state,
    buildingList: action.payload,
  }),
  [ProjectComplexActionType.setBuilding]:           (state,
                                                     action
                                                    ) => ({
    ...state,
    buildingDetail: action.payload,
  }),
  [ProjectComplexActionType.buildingFileModal]:     (state,
                                                     action
                                                    ) => ({
    ...state,
    buildingFileModal: action.payload,
  }),
  [ProjectComplexActionType.setTestDetail]:         (state,
                                                     action
                                                    ) => ({
    ...state,
    testDetail: action.payload,
  }),
  [ProjectComplexActionType.requestPushSite]:       (state,
                                                     action
                                                    ) => ({
    ...state,
    requestPushSite: action.payload,
  }),
  [ProjectComplexActionType.requestUpdateSite]:     (state,
                                                     action
                                                    ) => ({
    ...state,
    requestUpdateSite: action.payload,
  }),
  [ProjectComplexActionType.requestDeleteSite]:     (state,
                                                     action
                                                    ) => ({
    ...state,
    requestDeleteSite: action.payload,
  }),
  [ProjectComplexActionType.requestPushBuilding]:   (state,
                                                     action
                                                    ) => ({
    ...state,
    requestPushBuilding: action.payload,
  }),
  [ProjectComplexActionType.requestUpdateBuilding]: (state,
                                                     action
                                                    ) => ({
    ...state,
    requestUpdateBuilding: action.payload,
  }),
  [ProjectComplexActionType.requestDeleteBuilding]: (state,
                                                     action
                                                    ) => ({
    ...state,
    requestDeleteBuilding: action.payload,
  }),
});