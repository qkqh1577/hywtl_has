import { createAction } from 'typesafe-actions';
import { ProjectStatus } from 'project_status/domain';
import { ProjectId } from 'project/domain';
import { ProjectBasicFailReasonParameter } from 'project_basic/parameter';

export enum ProjectStatusActionType {
  setProjectId               = 'project/status/project-id/set',
  setStatus                  = 'project/status/status/set',
  setFailReasonAddModal      = 'project/status/fail-reason-add-modal/set',
}

export const projectStatusAction = {
  setProjectId:               createAction(ProjectStatusActionType.setProjectId)<ProjectId>(),
  setStatus:                  createAction(ProjectStatusActionType.setStatus)<ProjectStatus>(),
  setFailReasonAddModal:      createAction(ProjectStatusActionType.setFailReasonAddModal)<boolean>(),
};

export enum ProjectStatusEventType {
  changeStatus              = 'event/project/status/status/change',
  confirmClickFailReasonAdd = 'event/project/status/fail-reason-add-modal/confirm-button/click',
  cancelClickFailReasonAdd  = 'event/project/status/fail-reason-add-modal/cancel-button/click',
  finishFailReasonAdd       = 'event/project/status/fail-reason-add-modal/finish',
}

export const projectStatusEvent = {
  changeStatus(status: Partial<ProjectStatus>) {
    return {
      type:    ProjectStatusEventType.changeStatus,
      payload: { status }
    };
  },
  confirmClickFailReasonAdd(failReason: ProjectBasicFailReasonParameter) {
    return {
      type:    ProjectStatusEventType.confirmClickFailReasonAdd,
      payload: { params: failReason }
    };
  },
  cancelClickFailReasonAdd() {
    return {
      type:    ProjectStatusEventType.cancelClickFailReasonAdd,
      payload: {}
    };
  },
  finishFailReasonAdd(success: boolean) {
    return {
      type:    ProjectStatusEventType.finishFailReasonAdd,
      payload: { success }
    };
  }
};
