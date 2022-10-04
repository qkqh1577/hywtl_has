import { createAction } from 'typesafe-actions';
import {
  ProjectDocumentId,
  ProjectDocumentShort,
  ProjectDocumentType,
  ProjectDocumentVO,
} from 'project_document/domain';
import {
  ProjectDocumentChangeParameter,
  ProjectDocumentParameter
} from 'project_document/parameter';
import { ApiStatus } from 'components/DataFieldProps';
import { ProjectId } from 'project/domain';

export enum ProjectDocumentAction {
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
  setProjectId:    createAction(ProjectDocumentAction.setProjectId)<ProjectId | undefined>(),
  setReceivedList: createAction(ProjectDocumentAction.setReceivedList)<ProjectDocumentShort[]>(),
  setSentList:     createAction(ProjectDocumentAction.setSentList)<ProjectDocumentShort[]>(),
  setBuildingList: createAction(ProjectDocumentAction.setBuildingList)<ProjectDocumentShort[]>(),
  setId:           createAction(ProjectDocumentAction.setId)<ProjectDocumentId | undefined>(),
  setOne:          createAction(ProjectDocumentAction.setOne)<ProjectDocumentVO | undefined>(),
  add:             createAction(ProjectDocumentAction.add)<ProjectDocumentParameter>(),
  requestAdd:      createAction(ProjectDocumentAction.requestAdd)<ApiStatus>(),
  change:          createAction(ProjectDocumentAction.change)<ProjectDocumentChangeParameter>(),
  requestChange:   createAction(ProjectDocumentAction.requestChange)<ApiStatus>(),
  addModal:        createAction(ProjectDocumentAction.addModal)<ProjectDocumentType | undefined>(),
  delete:          createAction(ProjectDocumentAction.delete)<number>(),
};
