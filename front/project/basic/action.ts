import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';

export enum ProjectBasicActionType {
  setId = 'project/basic/id/set',
}

export const projectBasicActionType = {
  setId: createAction(ProjectBasicActionType.setId)<ProjectId>(),
};