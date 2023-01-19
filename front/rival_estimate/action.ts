import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import {
  RivalEstimateId,
  RivalEstimateVO
} from 'rival_estimate/domain';
import { RivalEstimateParameter } from 'rival_estimate/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum RivalEstimateActionType {
  setProjectId  = 'project/sales/rival-estimate/project-id/set',
  setLoading    = 'project/sales/rival-estimate/list/loading',
  setList       = 'project/sales/rival-estimate/list/set',
  push          = 'project/sales/rival-estimate/push',
  requestPush   = 'project/sales/rival-estimate/push/request',
  update        = 'project/sales/rival-estimate/update',
  requestUpdate = 'project/sales/rival-estimate/update/request',
  deleteOne     = 'project/sales/rival-estimate/delete',
  requestDelete = 'project/sales/rival-estimate/delete/request',
}

export const rivalEstimateAction = {
  setProjectId:  createAction(RivalEstimateActionType.setProjectId)<ProjectId | undefined>(),
  setList:       createAction(RivalEstimateActionType.setList)<RivalEstimateVO[] | undefined>(),
  setLoading:    createAction(RivalEstimateActionType.setLoading)<boolean>(),
  push:          createAction(RivalEstimateActionType.push)(),
  requestPush:   createAction(RivalEstimateActionType.requestPush)<ApiStatus>(),
  update:        createAction(RivalEstimateActionType.update)<RivalEstimateParameter>(),
  requestUpdate: createAction(RivalEstimateActionType.requestUpdate)<ApiStatus>(),
  deleteOne:     createAction(RivalEstimateActionType.deleteOne)<RivalEstimateId>(),
  requestDelete: createAction(RivalEstimateActionType.requestDelete)<ApiStatus>(),
};