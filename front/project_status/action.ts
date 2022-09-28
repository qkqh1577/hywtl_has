import { createAction } from 'typesafe-actions';
import {
  ProjectEstimateExpectation,
  ProjectStatus
} from 'project_status/domain';
import { ProjectStatusParameter } from 'project_status/parameter';
import { ProjectId } from 'project/domain';

export enum ProjectStatusActionType {
  setProjectId           = 'project/status/project-id/set',
  setStatus              = 'project/status/status/set',
  updateStatus           = 'project/status/status/update',
  setEstimateExpectation = 'project/status/status/estimateExpectation/set'
}

export const projectStatusAction = {
  setProjectId:           createAction(ProjectStatusActionType.setProjectId)<ProjectId>(),
  setStatus:              createAction(ProjectStatusActionType.setStatus)<ProjectStatus>(),
  updateStatus:           createAction(ProjectStatusActionType.updateStatus)<ProjectStatusParameter>(),
  setEstimateExpectation: createAction(ProjectStatusActionType.setEstimateExpectation)<ProjectEstimateExpectation>(),
};
