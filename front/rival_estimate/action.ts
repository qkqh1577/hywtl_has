import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import {
  RivalEstimateId,
  RivalEstimateVO
} from 'rival_estimate/domain';
import { RivalEstimateParameter } from 'rival_estimate/parameter';

export enum RivalEstimateActionType {
  setProjectId  = 'project/sales/rival-estimate/project-id/set',
  setList       = 'project/sales/rival-estimate/list/set',
  push          = 'project/sales/rival-estimate/push',
  update        = 'project/sales/rival-estimate/update',
  requestUpdate = 'project/sales/rival-estimate/update/request',
  deleteOne     = 'project/sales/rival-estimate/delete',
}

export const rivalEstimateAction = {
  setProjectId:  createAction(RivalEstimateActionType.setProjectId)<ProjectId | undefined>(),
  setList:       createAction(RivalEstimateActionType.setList)<RivalEstimateVO[] | undefined>(),
  push:          createAction(RivalEstimateActionType.push)(),
  update:        createAction(RivalEstimateActionType.update)<RivalEstimateParameter>(),
  requestUpdate: createAction(RivalEstimateActionType.requestUpdate)<string>(),
  deleteOne:     createAction(RivalEstimateActionType.deleteOne)<RivalEstimateId>(),
};