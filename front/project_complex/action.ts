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

export enum ProjectComplexActionType {
  setId             = 'project/sales/complex/id/set',
  setSiteList       = 'project/sales/complex/site-list/set',
  setBuildingList   = 'project/sales/complex/building-list/set',
  setBuilding       = 'project/sales/complex/building/set',
  pushSite          = 'project/sales/complex/site/push',
  requestSite       = 'project/sales/complex/site/request',
  updateSite        = 'project/sales/complex/site/update',
  deleteSite        = 'project/sales/complex/site/delete',
  pushBuilding      = 'project/sales/complex/building/push',
  requestBuilding   = 'project/sales/complex/building/request',
  updateBuilding    = 'project/sales/complex/building/update',
  deleteBuilding    = 'project/sales/complex/building/delete',
  buildingFileModal = 'project/sales/complex/building/file/modal',
  setTestDetail     = 'project/sales/complex/test/set',
}

export const projectComplexAction = {
  setId:             createAction(ProjectComplexActionType.setId)<ProjectId | undefined>(),
  setSiteList:       createAction(ProjectComplexActionType.setSiteList)<ProjectComplexSiteVO[] | undefined>(),
  setBuildingList:   createAction(ProjectComplexActionType.setBuildingList)<ProjectComplexBuildingVO[] | undefined>(),
  setBuilding:       createAction(ProjectComplexActionType.setBuilding)<ProjectComplexBuildingVO | undefined>(),
  pushSite:          createAction(ProjectComplexActionType.pushSite)(),
  requestSite:       createAction(ProjectComplexActionType.requestSite)<string>(),
  updateSite:        createAction(ProjectComplexActionType.updateSite)<ProjectComplexSiteParameter>(),
  deleteSite:        createAction(ProjectComplexActionType.deleteSite)<ProjectComplexSiteId>(),
  pushBuilding:      createAction(ProjectComplexActionType.pushBuilding)(),
  requestBuilding:   createAction(ProjectComplexActionType.requestBuilding)<string>(),
  updateBuilding:    createAction(ProjectComplexActionType.updateBuilding)<ProjectComplexBuildingParameter>(),
  deleteBuilding:    createAction(ProjectComplexActionType.deleteBuilding)<ProjectComplexBuildingId>(),
  buildingFileModal: createAction(ProjectComplexActionType.buildingFileModal)<ProjectComplexBuildingId | undefined>(),
  setTestDetail:     createAction(ProjectComplexActionType.setTestDetail)<ProjectComplexTestVO | undefined>(),
};