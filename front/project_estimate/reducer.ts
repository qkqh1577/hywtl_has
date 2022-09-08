import { ProjectId } from 'project/domain';
import {
  ProjectEstimateType,
  ProjectEstimateVO
} from 'project_estimate/domain';
import { createReducer } from 'typesafe-actions';
import { ProjectEstimateActionType } from 'project_estimate/action';

export interface ProjectEstimateState {
  projectId?: ProjectId;
  list?: ProjectEstimateVO[];
  detail?: ProjectEstimateVO;
  customAddModal?: ProjectEstimateType;
  requestAdd: string;
}

const initial: ProjectEstimateState = {
  requestAdd: 'idle',
};

export const projectEstimateReducer = createReducer(initial, {
  [ProjectEstimateActionType.setProjectId]:      (state,
                                                  action
                                                 ) => ({
    ...state,
    projectId: action.payload,
  }),
  [ProjectEstimateActionType.setList]:           (state,
                                                  action
                                                 ) => ({
    ...state,
    list: action.payload,
  }),
  [ProjectEstimateActionType.setDetail]:         (state,
                                                  action
                                                 ) => ({
    ...state,
    detail: action.payload,
  }),
  [ProjectEstimateActionType.setCustomAddModal]: (state,
                                                  action
                                                 ) => ({
    ...state,
    customAddModal: action.payload,
  }),
  [ProjectEstimateActionType.requestAdd]:        (state,
                                                  action
                                                 ) => ({
    ...state,
    requestAdd: action.payload
  })
});