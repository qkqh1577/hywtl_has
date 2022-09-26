import { createAction } from 'typesafe-actions';
import { ProjectQuery } from 'project/query';
import Page from 'type/Page';
import {
  ProjectShortVO,
  ProjectVO
} from 'project/domain';
import {
  ProjectAddParameter,
  ProjectStatusParameter
} from 'project/parameter';

export enum ProjectAction {
  setFilter    = 'project/sales/filter/set',
  setPage      = 'project/sales/page/set',
  setOne       = 'project/sales/one/set',
  updateStatus = 'project/sales/status/update',
  add          = 'project/sales/add',
  requestAdd   = 'project/sales/add/request',
  setAddModal  = 'project/sales/addModal/set'
}

export const projectAction = {
  setFilter:    createAction(ProjectAction.setFilter)<ProjectQuery>(),
  setPage:      createAction(ProjectAction.setPage)<Page<ProjectShortVO> | undefined>(),
  setOne:       createAction(ProjectAction.setOne)<ProjectVO | undefined>(),
  updateStatus: createAction(ProjectAction.updateStatus)<ProjectStatusParameter>(),
  add:          createAction(ProjectAction.add)<ProjectAddParameter>(),
  requestAdd:   createAction(ProjectAction.requestAdd)<string>(),
  setAddModal:  createAction(ProjectAction.setAddModal)<boolean>(),
};