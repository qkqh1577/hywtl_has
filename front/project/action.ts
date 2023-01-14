import { createAction } from 'typesafe-actions';
import Page from 'type/Page';
import {
  ProjectAddParameter,
  ProjectQuery,
  ProjectStatusParameter,
  ProjectUpdateParameter
} from 'project/parameter';
import {
  ProjectId,
  ProjectShortVO,
  ProjectVO
} from 'project/domain';
import { ApiStatus } from 'components/DataFieldProps';
import { ProjectBasicFailReasonParameter } from 'project_basic/parameter';

export enum ProjectFilterStatus {
  IDLE  = 'idle',
  OPEN  = 'open',
  CLOSE = 'close'
}

export enum ProjectActionType {
  setLoading           = 'project/sales/loading/set',
  setFilter            = 'project/sales/filter/set',
  setPage              = 'project/sales/page/set',
  setId                = 'project/sales/id/set',
  setOne               = 'project/sales/one/set',
  add                  = 'project/sales/add',
  requestAdd           = 'project/sales/add/request',
  setAddModal          = 'project/sales/addModal/set',
  updateStatus         = 'project/sales/status/update',
  requestUpdateStatus  = 'project/sales/status/update/request',
  addFailReason        = 'project/sales/fail-reason/add',
  requestAddFailReason = 'project/sales/fail-reason/add/request',
  setFailReasonModal   = 'project/sales/fail-reason-modal/set',
  toggleDrawer         = 'project/sales/drawer/toggle',
  toggleFilter         = 'project/sales/filter/toggle',
  setFilterStatus      = 'project/sales/filter/status/set',
  delete               = 'project/sales/delete',
  requestDelete        = 'project/sales/delete/request',
  updateFavorite       = 'project/sales/favorite/update',
}

export const projectAction = {
  setLoading:           createAction(ProjectActionType.setLoading)<boolean>(),
  setFilter:            createAction(ProjectActionType.setFilter)<ProjectQuery>(),
  setPage:              createAction(ProjectActionType.setPage)<Page<ProjectShortVO> | undefined>(),
  setOne:               createAction(ProjectActionType.setOne)<ProjectVO | undefined>(),
  setId:                createAction(ProjectActionType.setId)<ProjectId | undefined>(),
  add:                  createAction(ProjectActionType.add)<ProjectAddParameter>(),
  requestAdd:           createAction(ProjectActionType.requestAdd)<ApiStatus>(),
  setAddModal:          createAction(ProjectActionType.setAddModal)<boolean>(),
  updateStatus:         createAction(ProjectActionType.updateStatus)<ProjectStatusParameter>(),
  requestUpdateStatus:  createAction(ProjectActionType.requestUpdateStatus)<ApiStatus>(),
  addFailReason:        createAction(ProjectActionType.addFailReason)<ProjectBasicFailReasonParameter>(),
  requestAddFailReason: createAction(ProjectActionType.requestAddFailReason)<ApiStatus>(),
  setFailReasonModal:   createAction(ProjectActionType.setFailReasonModal)<boolean>(),
  toggleDrawer:         createAction(ProjectActionType.toggleDrawer)(),
  toggleFilter:         createAction(ProjectActionType.toggleFilter)(),
  setFilterStatus:      createAction(ProjectActionType.setFilterStatus)<ProjectFilterStatus>(),
  delete:               createAction(ProjectActionType.delete)(),
  requestDelete:        createAction(ProjectActionType.requestDelete)<ApiStatus>(),
  updateFavorite:       createAction(ProjectActionType.updateFavorite)<ProjectUpdateParameter>(),
};
