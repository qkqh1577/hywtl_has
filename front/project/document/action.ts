import { createAction } from 'typesafe-actions';
import {
  DocumentShort,
  DocumentVO
} from 'project/document/domain';

export enum DocumentAction{
  setReceivedList = 'project/sales/id/document/received-list/set',
  setSentList     = 'project/sales/id/document/sent-list/set',
  setBuildingList = 'project/sales/id/document/building-list/set',
  setAllList      = 'project/sales/id/document/all-list/set',
  setOne          = 'project/sales/id/document/one/set',
}

export const documentAction={
  setReceivedList: createAction(DocumentAction.setReceivedList)<DocumentShort[]>(),
  setSentList: createAction(DocumentAction.setSentList)<DocumentShort[]>(),
  setBuildingList: createAction(DocumentAction.setBuildingList)<DocumentShort[]>(),
  setAllList: createAction(DocumentAction.setAllList)<number>(),
  setOne: createAction(DocumentAction.setOne)<DocumentVO>()
}
