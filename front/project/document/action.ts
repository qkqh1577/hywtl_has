import { createAction } from 'typesafe-actions';
import {
  DocumentShort,
  DocumentVO
} from 'project/document/domain';
import { FormikSubmit } from 'type/Form';
import { ProjectDocumentParameter } from 'project/document/parameter';

export enum ProjectDocumentAction {
  setReceivedList = 'project/sales/id/document/received-list/set',
  setSentList     = 'project/sales/id/document/sent-list/set',
  setBuildingList = 'project/sales/id/document/building-list/set',
  setAllList      = 'project/sales/id/document/all-list/set',
  setOne          = 'project/sales/id/document/one/set',
  add             = 'project/sales/id/document/modal/add',
  update          = 'project/sales/id/document/modal/update'
}

export const projectDocumentAction = {
  setReceivedList: createAction(ProjectDocumentAction.setReceivedList)<DocumentShort[]>(),
  setSentList:     createAction(ProjectDocumentAction.setSentList)<DocumentShort[]>(),
  setBuildingList: createAction(ProjectDocumentAction.setBuildingList)<DocumentShort[]>(),
  setAllList:      createAction(ProjectDocumentAction.setAllList)<number>(),
  setOne:          createAction(ProjectDocumentAction.setOne)<DocumentVO>(),
  add:             createAction(ProjectDocumentAction.add)<FormikSubmit<ProjectDocumentParameter>>(),
  update:          createAction(ProjectDocumentAction.update)<FormikSubmit<ProjectDocumentParameter>>(),
};
