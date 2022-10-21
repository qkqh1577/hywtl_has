import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import {
  ProjectComplexBuildingId,
  ProjectComplexBuildingVO,
  ProjectComplexSiteId,
  ProjectComplexSiteVO,
  ProjectComplexTestVO
} from 'project_complex/domain';
import {
  ProjectComplexBuildingParameter,
  ProjectComplexSiteParameter
} from 'project_complex/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum ProjectComplexActionType {
  setId                 = 'project/sales/complex/id/set',
  getSiteList           = 'project/sales/complex/site-list/get',
  setSiteList           = 'project/sales/complex/site-list/set',
  setBuildingList       = 'project/sales/complex/building-list/set',
  getBuildingList       = 'project/sales/complex/building-list/get',
  setBuilding           = 'project/sales/complex/building/set',

  pushSite              = 'project/sales/complex/site/push',
  requestPushSite       = 'project/sales/complex/site/push/request',
  updateSite            = 'project/sales/complex/site/update',
  requestUpdateSite     = 'project/sales/complex/site/update/request',
  deleteSite            = 'project/sales/complex/site/delete',
  requestDeleteSite     = 'project/sales/complex/site/delete/request',

  pushBuilding          = 'project/sales/complex/building/push',
  requestPushBuilding   = 'project/sales/complex/building/push/request',
  updateBuilding        = 'project/sales/complex/building/update',
  requestUpdateBuilding = 'project/sales/complex/building/update/request',
  deleteBuilding        = 'project/sales/complex/building/delete',
  requestDeleteBuilding = 'project/sales/complex/building/delete/request',

  buildingFileModal     = 'project/sales/complex/building/file/modal',
  setTestDetail         = 'project/sales/complex/test/set',
}

export const projectComplexAction = {
  setId:           createAction(ProjectComplexActionType.setId)<ProjectId | undefined>(),
  getSiteList:     createAction(ProjectComplexActionType.getSiteList)<ProjectId | undefined>(),
  setSiteList:     createAction(ProjectComplexActionType.setSiteList)<ProjectComplexSiteVO[] | undefined>(),
  getBuildingList: createAction(ProjectComplexActionType.getBuildingList)<ProjectId | undefined>(),
  setBuildingList: createAction(ProjectComplexActionType.setBuildingList)<ProjectComplexBuildingVO[] | undefined>(),
  setBuilding:     createAction(ProjectComplexActionType.setBuilding)<ProjectComplexBuildingVO | undefined>(),

  pushSite:          createAction(ProjectComplexActionType.pushSite)(),
  requestPushSite:   createAction(ProjectComplexActionType.requestPushSite)<ApiStatus>(),
  updateSite:        createAction(ProjectComplexActionType.updateSite)<ProjectComplexSiteParameter>(),
  requestUpdateSite: createAction(ProjectComplexActionType.requestUpdateSite)<ApiStatus>(),
  deleteSite:        createAction(ProjectComplexActionType.deleteSite)<ProjectComplexSiteId>(),
  requestDeleteSite: createAction(ProjectComplexActionType.requestDeleteSite)<ApiStatus>(),

  pushBuilding:          createAction(ProjectComplexActionType.pushBuilding)(),
  requestPushBuilding:   createAction(ProjectComplexActionType.requestPushBuilding)<ApiStatus>(),
  updateBuilding:        createAction(ProjectComplexActionType.updateBuilding)<ProjectComplexBuildingParameter>(),
  requestUpdateBuilding: createAction(ProjectComplexActionType.requestUpdateBuilding)<ApiStatus>(),
  deleteBuilding:        createAction(ProjectComplexActionType.deleteBuilding)<ProjectComplexBuildingId>(),
  requestDeleteBuilding: createAction(ProjectComplexActionType.requestDeleteBuilding)<ApiStatus>(),

  buildingFileModal: createAction(ProjectComplexActionType.buildingFileModal)<ProjectComplexBuildingId | undefined>(),
  setTestDetail:     createAction(ProjectComplexActionType.setTestDetail)<ProjectComplexTestVO | undefined>(),
};