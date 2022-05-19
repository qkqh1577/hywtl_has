import { createAction } from 'typesafe-actions';
import {
  ProjectTargetDocument,
  ProjectTargetDocumentAddParameter,
  ProjectTargetDocumentChangeParameter,
} from 'services/project_target';

export enum ProjectTargetActionType {
  getDocumentList = 'project/target/document/getList',
  setDocumentList = 'project/target/document/setList',
  getDocument = 'project/target/document/getOne',
  setDocument = 'project/target/document/setOne',
  addDocument = 'project/target/document/add',
  updateDocument = 'project/target/document/update',
  removeDocument = 'project/target/document/remove',
  setDocumentId = 'project/target/document/setId',
}

export const projectTargetActions = {
  getDocumentList: createAction(ProjectTargetActionType.getDocumentList)<number>(),
  setDocumentList: createAction(ProjectTargetActionType.setDocumentList)<ProjectTargetDocument[] | undefined>(),
  getDocument: createAction(ProjectTargetActionType.getDocument)<number>(),
  setDocument: createAction(ProjectTargetActionType.setDocument)<ProjectTargetDocument | undefined>(),
  addDocument: createAction(ProjectTargetActionType.addDocument)<{
    projectId: number;
    params: ProjectTargetDocumentAddParameter;
    callback: () => void;
  }>(),
  updateDocument: createAction(ProjectTargetActionType.updateDocument)<{
    id: number;
    params: ProjectTargetDocumentChangeParameter;
    callback: () => void;
  }>(),
  removeDocument: createAction(ProjectTargetActionType.removeDocument)<{
    id: number;
    callback: () => void;
  }>(),
  setDocumentId: createAction(ProjectTargetActionType.setDocumentId)<number | null | undefined>(),
};