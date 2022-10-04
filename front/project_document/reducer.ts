import {
  ProjectDocumentShort,
  ProjectDocumentType,
  ProjectDocumentVO
} from 'project_document/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectDocumentAction } from 'project_document/action';
import { ApiStatus } from 'components/DataFieldProps';
import { ProjectId } from 'project/domain';

export interface ProjectDocumentState {
  projectId?: ProjectId;
  receivedList?: ProjectDocumentShort[];
  sentList?: ProjectDocumentShort[];
  buildingList?: ProjectDocumentShort[];
  detail?: ProjectDocumentVO;
  addModal?: ProjectDocumentType;
  requestAdd: ApiStatus;
  requestChange: ApiStatus;
  detailModal?: ProjectDocumentVO;
}

const initialDocumentState: ProjectDocumentState = {
  requestAdd:    ApiStatus.IDLE,
  requestChange: ApiStatus.IDLE,
};

export const projectDocumentReducer = createReducer(initialDocumentState, {
  [ProjectDocumentAction.setProjectId]:    (state,
                                            action
                                           ) => ({
    ...state,
    projectId: action.payload,
  }),
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

  [ProjectDocumentAction.setOne]:        (state,
                                          action
                                         ) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectDocumentAction.addModal]:      (state,
                                          action
                                         ) => ({
    ...state,
    addModal: action.payload,
  }),
  [ProjectDocumentAction.requestAdd]:    (state,
                                          action
                                         ) => ({
    ...state,
    requestAdd: action.payload
  }),
  [ProjectDocumentAction.requestChange]: (state,
                                          action
                                         ) => ({
    ...state,
    requestChange: action.payload,
  })
});

