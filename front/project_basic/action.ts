import { createAction } from 'typesafe-actions';
import {
  ProjectBasicBidType,
  ProjectId,
  ProjectVO
} from 'project/domain';
import { ProjectBasicBusinessParameter } from 'project_basic/parameter';
import {
  ProjectBasicBid,
  ProjectBasicBusiness,
  ProjectBasicBusinessId,
  ProjectBasicContract,
  ProjectBasicDesign,
  ProjectBasicEstimate,
  ProjectBasicFailReason,
  ProjectBasicTest
} from 'project_basic/domain';
import { FormikSubmit } from 'type/Form';

export enum ProjectBasicActionType {
  setId           = 'project/basic/id/set',
  setBasic        = 'project/basic/basic/set',
  setBidType      = 'project/basic/basic/bid-type/set',
  setBusinessList = 'project/basic/business-list/set',
  setBusiness     = 'project/basic/business/set',
  pushBusiness    = 'project/basic/business/push',
  deleteBusiness  = 'project/basic/business/delete',
  setDesign       = 'project/basic/design/push',
  setTest         = 'project/basic/test/set',
  setEstimate     = 'project/basic/estimate/set',
  setBid          = 'project/basic/bid/set',
  setContract     = 'project/basic/contract/set',
  setFailReason   = 'project/basic/fail-reason/set'
}

export const projectBasicActionType = {
  setId:           createAction(ProjectBasicActionType.setId)<ProjectId | undefined>(),
  setBasic:        createAction(ProjectBasicActionType.setBasic)<ProjectVO | undefined>(),
  setBidType:      createAction(ProjectBasicActionType.setBidType)<ProjectBasicBidType | undefined>(),
  setBusinessList: createAction(ProjectBasicActionType.setBusinessList)<ProjectBasicBusiness[] | undefined>(),
  setBusiness:     createAction(ProjectBasicActionType.setBusiness)<ProjectBasicBusiness | undefined>(),
  pushBusiness:    createAction(ProjectBasicActionType.pushBusiness)<FormikSubmit<ProjectBasicBusinessParameter>>(),
  deleteBusiness:  createAction(ProjectBasicActionType.deleteBusiness)<ProjectBasicBusinessId>(),
  setDesign:       createAction(ProjectBasicActionType.setDesign)<ProjectBasicDesign | undefined>(),
  setTest:         createAction(ProjectBasicActionType.setTest)<ProjectBasicTest | undefined>(),
  setEstimate:     createAction(ProjectBasicActionType.setEstimate)<ProjectBasicEstimate | undefined>(),
  setBid:          createAction(ProjectBasicActionType.setBid)<ProjectBasicBid | undefined>(),
  setContract:     createAction(ProjectBasicActionType.setContract)<ProjectBasicContract | undefined>(),
  setFailReason:   createAction(ProjectBasicActionType.setFailReason)<ProjectBasicFailReason | undefined>(),
};
