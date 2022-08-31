import { createAction } from 'typesafe-actions';
import {
  ProjectDocumentShort,
  ProjectDocumentVO,
} from 'project/document/domain';
import {
  FormikPartial,
  FormikSubmit
} from 'type/Form';
import { ProjectDocumentParameter } from 'project/document/parameter';

export enum ProjectDocumentAction {
  setReceivedList = 'project/sales/projectId/document/received-list/set',
  setSentList     = 'project/sales/projectId/document/sent-list/set',
  setBuildingList = 'project/sales/projectId/document/building-list/set',
  setAllList      = 'project/sales/projectId/document/all-list/set',
  setId           = 'project/sales/projectId/document/id/set',
  setOne          = 'project/sales/projectId/document/one/set',
  add             = 'project/sales/projectId/document/modal/add',
  update          = 'project/sales/projectId/document/modal/update'
}

export const projectDocumentAction = {
  setReceivedList: createAction(ProjectDocumentAction.setReceivedList)<ProjectDocumentShort[]>(),
  setSentList:     createAction(ProjectDocumentAction.setSentList)<ProjectDocumentShort[]>(),
  setBuildingList: createAction(ProjectDocumentAction.setBuildingList)<ProjectDocumentShort[]>(),
  setAllList:      createAction(ProjectDocumentAction.setAllList)<number>(),
  setId:           createAction(ProjectDocumentAction.setId)<number>(),
  setOne:          createAction(ProjectDocumentAction.setOne)<ProjectDocumentVO>(),
  add:             createAction(ProjectDocumentAction.add)<FormikSubmit<ProjectDocumentParameter>>(),
  update:          createAction(ProjectDocumentAction.update)<FormikSubmit<ProjectDocumentParameter>>(),
};
