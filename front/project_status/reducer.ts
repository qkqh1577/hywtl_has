import { createReducer } from 'typesafe-actions';
import { ProjectStatusActionType } from 'project_status/action';
import { ProjectId } from 'project/domain';
import { ProjectStatus } from 'project_status/domain';

export interface ProjectStatusState {
  projectId?: ProjectId;
  status?: ProjectStatus;
  failReasonAddModal: boolean;
}

const initial: ProjectStatusState = {
  failReasonAddModal: false,
};

export const projectStatusReducer = createReducer(initial, {
  [ProjectStatusActionType.setProjectId]:               (state,
                                                         action
                                                        ) => ({
    ...state,
    projectId: action.payload,
  }),
  [ProjectStatusActionType.setStatus]:                  (state,
                                                         action
                                                        ) => ({
    ...state,
    status: action.payload,
  }),
  [ProjectStatusActionType.setFailReasonAddModal]:      (state,
                                                         action
                                                        ) => ({
    ...state,
    failReasonAddModal: action.payload,
  }),
});
