import { createAction } from 'typesafe-actions';
import {
  ProjectDocumentShort,
  ProjectDocumentVO,
} from 'project/document/domain';
import {
  FormikSubmit
} from 'type/Form';
import {
  ProjectDocumentParameter,
  ProjectDocumentUpdateParameter
} from 'project/document/parameter';

export enum ProjectDocumentAction {
  setReceivedList = 'project/sales/projectId/document/received-list/set',
  setSentList     = 'project/sales/projectId/document/sent-list/set',
  setBuildingList = 'project/sales/projectId/document/building-list/set',
  setAllList      = 'project/sales/projectId/document/all-list/set',
  setId           = 'project/sales/projectId/document/id/set',
  setOne          = 'project/sales/projectId/document/one/set',
  add             = 'project/sales/projectId/document/add',
  update          = 'project/sales/document/update',
  delete          = 'project/sales/document/delete',
  addModal        = 'project/sales/projectId/document/addModal',
}

export const projectDocumentAction = {
  setReceivedList: createAction(ProjectDocumentAction.setReceivedList)<ProjectDocumentShort[]>(),
  setSentList:     createAction(ProjectDocumentAction.setSentList)<ProjectDocumentShort[]>(),
  setBuildingList: createAction(ProjectDocumentAction.setBuildingList)<ProjectDocumentShort[]>(),
  setAllList:      createAction(ProjectDocumentAction.setAllList)<number>(),
  setId:           createAction(ProjectDocumentAction.setId)<number>(),
  setOne:          createAction(ProjectDocumentAction.setOne)<ProjectDocumentVO | undefined>(),
  add:             createAction(ProjectDocumentAction.add)<ProjectDocumentParameter>(),
  update:          createAction(ProjectDocumentAction.update)<FormikSubmit<ProjectDocumentUpdateParameter>>(),
  addModal:        createAction(ProjectDocumentAction.addModal)<string>(),
  delete:          createAction(ProjectDocumentAction.delete)<number>(),
};
