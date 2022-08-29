import {
  DocumentShort,
  DocumentVO
} from 'project/document/domain';
import { createReducer } from 'typesafe-actions';
import { DocumentAction } from 'project/document/action';

export interface DocumentState{
  list?: DocumentShort[];
  detail?: DocumentVO;
}

const initialDocumentState: DocumentState = {};

export const documentReducer = createReducer(initialDocumentState, {
  [DocumentAction.setList]: (state, action) => ({
    ...state,
    list: action.payload
  }),

  [DocumentAction.setOne]: (state, action) => ({
    ...state,
    detail: action.payload,
  })
})

