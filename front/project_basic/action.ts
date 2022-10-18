import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import {
  ProjectBasic,
  ProjectBasicBusiness,
  ProjectBasicBusinessId,
  ProjectBasicDesign,
} from 'project_basic/domain';
import {
  ProjectBasicBusinessParameter,
  ProjectBasicDesignParameter,
  ProjectBasicParameter
} from 'project_basic/parameter';
import { ApiStatus } from 'components/DataFieldProps';
import {
  BusinessId,
  BusinessVO
} from 'business/domain';
import { ProjectComplexTestVO } from 'project_complex/domain';

export enum ProjectBasicActionType {
  addBusiness           = 'project/basic/business/add',
  changeBusiness        = 'project/basic/business/change',
  deleteBusiness        = 'project/basic/business/delete',
  getBasic              = 'project/basic/get',
  getBusiness           = 'project/basic/business/get',
  getBusinessList       = 'project/basic/business-list/get',
  getDesign             = 'project/basic/design/get',
  getTest               = 'project/basic/test/get',
  requestAddBusiness    = 'project/basic/business/add/request',
  requestChangeBusiness = 'project/basic/business/change/request',
  requestDeleteBusiness = 'project/basic/business/delete/request',
  requestUpdateBasic    = 'project/basic/update/request',
  requestUpdateDesign   = 'project/basic/design/update/request',
  setBasic              = 'project/basic/basic/set',
  setBusiness           = 'project/basic/business/set',
  setBusinessList       = 'project/basic/business-list/set',
  setBusinessModal      = 'project/basic/business-modal',
  setDesign             = 'project/basic/design/set',
  setId                 = 'project/basic/id/set',
  setTest               = 'project/basic/test/set',
  updateBasic           = 'project/basic/update',
  updateDesign          = 'project/basic/design/update',
}

export const projectBasicAction = {
  addBusiness:           createAction(ProjectBasicActionType.addBusiness)<ProjectBasicBusinessParameter>(),
  changeBusiness:        createAction(ProjectBasicActionType.changeBusiness)<ProjectBasicBusinessParameter>(),
  deleteBusiness:        createAction(ProjectBasicActionType.deleteBusiness)<ProjectBasicBusinessId>(),
  getBasic:              createAction(ProjectBasicActionType.getBasic)<ProjectId | undefined>(),
  getBusiness:           createAction(ProjectBasicActionType.getBusiness)<BusinessId | undefined>(),
  getBusinessList:       createAction(ProjectBasicActionType.getBusinessList)<ProjectId | undefined>(),
  getDesign:             createAction(ProjectBasicActionType.getDesign)<ProjectId | undefined>(),
  getTest:               createAction(ProjectBasicActionType.getTest)<ProjectId | undefined>(),
  requestAddBusiness:    createAction(ProjectBasicActionType.requestAddBusiness)<ApiStatus>(),
  requestChangeBusiness: createAction(ProjectBasicActionType.requestChangeBusiness)<ApiStatus>(),
  requestDeleteBusiness: createAction(ProjectBasicActionType.requestDeleteBusiness)<ApiStatus>(),
  requestUpdateBasic:    createAction(ProjectBasicActionType.requestUpdateBasic)<ApiStatus>(),
  requestUpdateDesign:   createAction(ProjectBasicActionType.requestUpdateDesign)<ApiStatus>(),
  setBasic:              createAction(ProjectBasicActionType.setBasic)<ProjectBasic | undefined>(),
  setBusiness:           createAction(ProjectBasicActionType.setBusiness)<BusinessVO | undefined>(),
  setBusinessList:       createAction(ProjectBasicActionType.setBusinessList)<ProjectBasicBusiness[] | undefined>(),
  setBusinessModal:      createAction(ProjectBasicActionType.setBusinessModal)<ProjectBasicBusinessParameter | undefined>(),
  setDesign:             createAction(ProjectBasicActionType.setDesign)<ProjectBasicDesign | undefined>(),
  setId:                 createAction(ProjectBasicActionType.setId)<ProjectId | undefined>(),
  setTest:               createAction(ProjectBasicActionType.setTest)<ProjectComplexTestVO | undefined>(),
  updateBasic:           createAction(ProjectBasicActionType.updateBasic)<ProjectBasicParameter>(),
  updateDesign:          createAction(ProjectBasicActionType.updateDesign)<ProjectBasicDesignParameter>(),
};

