import {
  ProjectDocumentShortVO,
  ProjectDocumentType,
  ProjectDocumentVO
} from 'project_document/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectDocumentActionType } from 'project_document/action';
import { ApiStatus } from 'components/DataFieldProps';
import { ProjectId } from 'project/domain';

export interface ProjectDocumentState {
  projectId?: ProjectId;
  receivedList?: ProjectDocumentShortVO[];
  sentList?: ProjectDocumentShortVO[];
  buildingList?: ProjectDocumentShortVO[];
  detail?: ProjectDocumentVO;
  addModal?: ProjectDocumentType;
  requestAdd: ApiStatus;
  requestChange: ApiStatus;
  requestDelete: ApiStatus;
  detailModal?: ProjectDocumentVO;
}

const initial: ProjectDocumentState = {
  requestAdd:    'idle',
  requestChange: 'idle',
  requestDelete: 'idle',
};

export const projectDocumentReducer = createReducer(initial, {
  [ProjectDocumentActionType.setProjectId]:    (state,
                                                action
                                               ) => ({
    ...state,
    projectId: action.payload,
  }),
  [ProjectDocumentActionType.setReceivedList]: (state,
                                                action
                                               ) => ({
    ...state,
    receivedList: action.payload
  }),

  [ProjectDocumentActionType.setSentList]: (state,
                                            action
                                           ) => ({
    ...state,
    sentList: action.payload
  }),

  [ProjectDocumentActionType.setBuildingList]: (state,
                                                action
                                               ) => ({
    ...state,
    buildingList: action.payload
  }),

  [ProjectDocumentActionType.setOne]:        (state,
                                              action
                                             ) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectDocumentActionType.addModal]:      (state,
                                              action
                                             ) => ({
    ...state,
    addModal: action.payload,
  }),
  [ProjectDocumentActionType.requestAdd]:    (state,
                                              action
                                             ) => ({
    ...state,
    requestAdd: action.payload
  }),
  [ProjectDocumentActionType.requestChange]: (state,
                                              action
                                             ) => ({
    ...state,
    requestChange: action.payload,
  }),
  [ProjectDocumentActionType.requestDelete]: (state,
                                              action
                                             ) => ({
    ...state,
    requestDelete: action.payload,
  })
});

