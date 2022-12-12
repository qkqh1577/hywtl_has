import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import {
  ProjectCollectionStageId,
  ProjectCollectionStageStatusVO,
  ProjectCollectionStageVO,
  ProjectCollectionVO
} from 'project_collection/domain';
import { UserId } from 'user/domain';
import { ApiStatus } from 'components/DataFieldProps';
import {
  ProjectCollectionAddStageParameter,
  ProjectCollectionChangeStageParameter
} from 'project_collection/parameter';

export enum ProjectCollectionActionType {
  setProjectId          = 'project/sales/collection/project-id/set',
  setOne                = 'project/sales/collection/set',

  updateManager         = 'project/sales/collection/manager/update',
  requestUpdateManager  = 'project/sales/collection/manager/update/request',

  changeStageSeq        = 'project/sales/collection/stage/seq/change',
  requestChangeStageSeq = 'project/sales/collection/stage/seq/change/request',

  setStage              = 'project/sales/collection/stage/set',

  addStage              = 'project/sales/collection/stage/add',
  requestAddStage       = 'project/sales/collection/stage/add/request',

  changeStage           = 'project/sales/collection/stage/change',
  requestChangeStage    = 'project/sales/collection/stage/change/request',

  deleteStage           = 'project/sales/collection/stage/delete',
  requestDeleteStage    = 'project/sales/collection/stage/delete/request',

  stageSeqModal         = 'project/sales/collection/stage/seq-modal',
  stageAddModal         = 'project/sales/collection/stage/add-modal',
  stageDetailModal      = 'project/sales/collection/stage/detail-modal',

  stageStatusModal      = 'project/sales/collection/stage/status-modal',
}

export const projectCollectionAction = {
  setProjectId: createAction(ProjectCollectionActionType.setProjectId)<ProjectId | undefined>(),
  setOne:       createAction(ProjectCollectionActionType.setOne)<ProjectCollectionVO | undefined>(),

  updateManager:        createAction(ProjectCollectionActionType.updateManager)<UserId | undefined>(),
  requestUpdateManager: createAction(ProjectCollectionActionType.requestUpdateManager)<ApiStatus>(),

  changeStageSeq:        createAction(ProjectCollectionActionType.changeStageSeq)<ProjectCollectionStageId[]>(),
  requestChangeStageSeq: createAction(ProjectCollectionActionType.requestChangeStageSeq)<ApiStatus>(),

  setStage: createAction(ProjectCollectionActionType.setStage)<ProjectCollectionStageVO | undefined>(),

  addStage:        createAction(ProjectCollectionActionType.addStage)<ProjectCollectionAddStageParameter>(),
  requestAddStage: createAction(ProjectCollectionActionType.requestAddStage)<ApiStatus>(),

  changeStage:        createAction(ProjectCollectionActionType.changeStage)<ProjectCollectionChangeStageParameter>(),
  requestChangeStage: createAction(ProjectCollectionActionType.requestChangeStage)<ApiStatus>(),

  deleteStage:        createAction(ProjectCollectionActionType.deleteStage)<ProjectCollectionStageId>(),
  requestDeleteStage: createAction(ProjectCollectionActionType.requestDeleteStage)<ApiStatus>(),

  stageSeqModal:    createAction(ProjectCollectionActionType.stageSeqModal)<boolean>(),
  stageAddModal:    createAction(ProjectCollectionActionType.stageAddModal)<boolean>(),
  stageDetailModal: createAction(ProjectCollectionActionType.stageDetailModal)<ProjectCollectionStageId | undefined>(),

  stageStatusModal: createAction(ProjectCollectionActionType.stageStatusModal)<ProjectCollectionStageStatusVO[]>(),
};
