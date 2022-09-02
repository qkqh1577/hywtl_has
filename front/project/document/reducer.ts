import {
  ProjectDocumentShort,
  ProjectDocumentType,
  ProjectDocumentVO
} from 'project/document/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectDocumentAction } from 'project/document/action';

export interface ProjectDocumentState {
  receivedList?: ProjectDocumentShort[];
  sentList?: ProjectDocumentShort[];
  buildingList?: ProjectDocumentShort[];
  detail?: ProjectDocumentVO;
  addModal: 'close' | ProjectDocumentType | 'request' | 'response';
  detailModal?: ProjectDocumentVO;
}

const initialDocumentState: ProjectDocumentState = { addModal: 'close' };

export const projectDocumentReducer = createReducer(initialDocumentState, {

  [ProjectDocumentAction.setReceivedList]: (state,
                                            action
                                           ) => ({
    ...state,
    receivedList: action.payload
  }),

  [ProjectDocumentAction.setSentList]: (state,
                                        action
                                       ) => ({
    ...state,
    sentList: action.payload
  }),

  [ProjectDocumentAction.setBuildingList]: (state,
                                            action
                                           ) => ({
    ...state,
    buildingList: action.payload
  }),

  [ProjectDocumentAction.setOne]:   (state,
                                     action
                                    ) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectDocumentAction.addModal]: (state,
                                     action
                                    ) => ({
    ...state,
    addModal: action.payload,
  }),
});

