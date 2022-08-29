import { createAction } from 'typesafe-actions';
import {
  DocumentShort,
  DocumentVO
} from 'project/document/domain';

export enum DocumentAction{
  setList = 'project/sales/id/document/list/set',
  setOne  = 'project/sales/id/document/one/set',
}

export const documentAction={
  setList: createAction(DocumentAction.setList)<DocumentShort[]>(),
  setOne: createAction(DocumentAction.setOne)<DocumentVO>()

}
