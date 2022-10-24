import { createAction } from 'typesafe-actions';
import {
  ProjectDocumentId,
  ProjectDocumentShortVO,
  ProjectDocumentType,
  ProjectDocumentVO,
} from 'project_document/domain';
import {
  ProjectDocumentChangeParameter,
  ProjectDocumentParameter
} from 'project_document/parameter';
import { ApiStatus } from 'components/DataFieldProps';
import { ProjectId } from 'project/domain';

export enum ProjectDocumentActionType {
  setProjectId    = 'project/sales/document/projectId/set',
  setReceivedList = 'project/sales/document/received-list/set',
  setSentList     = 'project/sales/document/sent-list/set',
  setBuildingList = 'project/sales/document/building-list/set',
  setId           = 'project/sales/document/id/set',
  setOne          = 'project/sales/document/one/set',
  add             = 'project/sales/document/add',
  requestAdd      = 'project/sales/document/add/request',
  change          = 'project/sales/document/change',
  requestChange   = 'project/sales/document/change/request',
  delete          = 'project/sales/document/delete',
  addModal        = 'project/sales/document/add-modal',
}

export const projectDocumentAction = {
  setProjectId:    createAction(ProjectDocumentActionType.setProjectId)<ProjectId | undefined>(),
  setReceivedList: createAction(ProjectDocumentActionType.setReceivedList)<ProjectDocumentShortVO[]>(),
  setSentList:     createAction(ProjectDocumentActionType.setSentList)<ProjectDocumentShortVO[]>(),
  setBuildingList: createAction(ProjectDocumentActionType.setBuildingList)<ProjectDocumentShortVO[]>(),
  setId:           createAction(ProjectDocumentActionType.setId)<ProjectDocumentId | undefined>(),
  setOne:          createAction(ProjectDocumentActionType.setOne)<ProjectDocumentVO | undefined>(),
  add:             createAction(ProjectDocumentActionType.add)<ProjectDocumentParameter>(),
  requestAdd:      createAction(ProjectDocumentActionType.requestAdd)<ApiStatus>(),
  change:          createAction(ProjectDocumentActionType.change)<ProjectDocumentChangeParameter>(),
  requestChange:   createAction(ProjectDocumentActionType.requestChange)<ApiStatus>(),
  addModal:        createAction(ProjectDocumentActionType.addModal)<ProjectDocumentType | undefined>(),
  delete:          createAction(ProjectDocumentActionType.delete)<number>(),
};
