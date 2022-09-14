import { createAction } from 'typesafe-actions';
import { ProjectId } from 'project/domain';
import { ProjectBidVO } from 'project_bid/domain';
import { ProjectBidParameter } from 'project_bid/parameter';

export enum ProjectBidActionType {
  setProjectId  = 'project/bid/project-id/set',
  setDetail     = 'project/bid/detail/set',
  requestUpdate = 'project/bid/update/request',
  update        = 'project/bid/update',

}

export const projectBidAction = {
  setProjectId:  createAction(ProjectBidActionType.setProjectId)<ProjectId | undefined>(),
  setDetail:     createAction(ProjectBidActionType.setDetail)<ProjectBidVO | undefined>(),
  requestUpdate: createAction(ProjectBidActionType.requestUpdate)<string>(),
  update:        createAction(ProjectBidActionType.update)<ProjectBidParameter>(),
};