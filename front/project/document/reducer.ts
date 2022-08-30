import {
  DocumentShort,
  DocumentVO
} from 'project/document/domain';
import { createReducer } from 'typesafe-actions';
import { DocumentAction } from 'project/document/action';

export interface ProjectDocumentState{
  receivedList?: DocumentShort[];
  sentList?: DocumentShort[];
  buildingList?: DocumentShort[];
  detail?: DocumentVO;
}

const initialDocumentState: ProjectDocumentState = {};

export const projectDocumentReducer = createReducer(initialDocumentState, {

  [DocumentAction.setReceivedList]: (state, action) => ({
    ...state,
    receivedList: action.payload
  }),

  [DocumentAction.setSentList]: (state, action) => ({
    ...state,
    sentList: action.payload
  }),

  [DocumentAction.setBuildingList]: (state, action) => ({
    ...state,
    buildingList: action.payload
  }),

  [DocumentAction.setOne]: (state, action) => ({
    ...state,
    detail: action.payload,
  })
})

