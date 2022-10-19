import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import { ApiStatus } from 'components/DataFieldProps';
import { RivalBidParameter } from 'rival_bid/parameter';
import {
  RivalBidId,
  RivalBidVO
} from 'rival_bid/domain';

export enum RivalBidActionType {
  setProjectId  = 'rival/bid/project-id/set',
  setList       = 'rival/bid/list/set',
  push          = 'rival/bid/push',
  requestPush   = 'rival/bid/push/request',
  update        = 'rival/bid/update',
  requestUpdate = 'rival/bid/update/request',
  deleteOne     = 'rival/bid/delete',
  requestDelete = 'rival/bid/delete/request',
}

export const rivalBidAction = {
  setProjectId:  createAction(RivalBidActionType.setProjectId)<ProjectId | undefined>(),
  setList:       createAction(RivalBidActionType.setList)<RivalBidVO[] | undefined>(),
  push:          createAction(RivalBidActionType.push)(),
  requestPush:   createAction(RivalBidActionType.requestPush)<ApiStatus>(),
  update:        createAction(RivalBidActionType.update)<RivalBidParameter>(),
  requestUpdate: createAction(RivalBidActionType.requestUpdate)<ApiStatus>(),
  deleteOne:     createAction(RivalBidActionType.deleteOne)<RivalBidId>(),
  requestDelete: createAction(RivalBidActionType.requestDelete)<ApiStatus>(),
};