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
import {
  FormikPartial,
  FormikSubmit
} from 'type/Form';

export enum ProjectAction {
  setFilter    = 'project/sales/filter/set',
  setPage      = 'project/sales/page/set',
  setOne       = 'project/sales/one/set',
  updateStatus = 'project/sales/status/update',
  add          = 'project/sales/add',
  setAddModal  = 'project/sales/addModal/set'
}

export const projectAction = {
  setFilter:    createAction(ProjectAction.setFilter)<FormikSubmit<ProjectQuery>>(),
  setPage:      createAction(ProjectAction.setPage)<Page<ProjectShortVO> | undefined>(),
  setOne:       createAction(ProjectAction.setOne)<ProjectVO | undefined>(),
  updateStatus: createAction(ProjectAction.updateStatus)<FormikSubmit<ProjectStatusParameter>>(),
  add:          createAction(ProjectAction.add)<FormikSubmit<FormikPartial<ProjectAddParameter>>>(),
  setAddModal:  createAction(ProjectAction.setAddModal)<boolean>(),
};