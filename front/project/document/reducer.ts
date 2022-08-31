import {
  ProjectDocumentShort,
  ProjectDocumentVO
} from 'project/document/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectDocumentAction } from 'project/document/action';
import { FormikPartial } from 'type/Form';

export interface ProjectDocumentState {
  receivedList?: ProjectDocumentShort[];
  sentList?: ProjectDocumentShort[];
  buildingList?: ProjectDocumentShort[];
  detail?: FormikPartial<ProjectDocumentVO>;
}

const initialDocumentState: ProjectDocumentState = {};

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

  [ProjectDocumentAction.setOne]: (state,
                                   action
                                  ) => ({
    ...state,
    detail: action.payload,
  })
});

