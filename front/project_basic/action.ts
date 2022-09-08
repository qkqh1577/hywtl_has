import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import { ProjectBasicBusinessParameter } from 'project_basic/parameter';
import {
  ProjectBasicBusiness,
  ProjectBasicBusinessId
} from 'project_basic/domain';
import { FormikSubmit } from 'type/Form';

export enum ProjectBasicActionType {
  setId           = 'project/basic/id/set',
  setBusinessList = 'project/basic/business-list/set',
  setBusiness     = 'project/basic/business/set',
  pushBusiness    = 'project/basic/business/push',
  deleteBusiness  = 'project/basic/business/delete',
}

export const projectBasicActionType = {
  setId:           createAction(ProjectBasicActionType.setId)<ProjectId | undefined>(),
  setBusinessList: createAction(ProjectBasicActionType.setBusinessList)<ProjectBasicBusiness[] | undefined>(),
  setBusiness:     createAction(ProjectBasicActionType.setBusiness)<ProjectBasicBusiness | undefined>(),
  pushBusiness:    createAction(ProjectBasicActionType.pushBusiness)<FormikSubmit<ProjectBasicBusinessParameter>>(),
  deleteBusiness:  createAction(ProjectBasicActionType.deleteBusiness)<ProjectBasicBusinessId>(),
};