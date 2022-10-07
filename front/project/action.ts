import { createAction } from 'typesafe-actions';
import { ProjectQuery } from 'project/query';
import Page from 'type/Page';
import { ProjectAddParameter } from 'project/parameter';
import {
  ProjectId,
  ProjectShortVO,
  ProjectVO
} from 'project/domain';
import { ApiStatus } from 'components/DataFieldProps';

export enum ProjectActionType {
  setFilter   = 'project/sales/filter/set',
  setPage     = 'project/sales/page/set',
  setId       = 'project/sales/id/set',
  setOne      = 'project/sales/one/set',
  add         = 'project/sales/add',
  requestAdd  = 'project/sales/add/request',
  setAddModal = 'project/sales/addModal/set',
}

export const projectAction = {
  setFilter:   createAction(ProjectActionType.setFilter)<ProjectQuery>(),
  setPage:     createAction(ProjectActionType.setPage)<Page<ProjectShortVO> | undefined>(),
  setOne:      createAction(ProjectActionType.setOne)<ProjectVO | undefined>(),
  setId:       createAction(ProjectActionType.setId)<ProjectId | undefined>(),
  add:         createAction(ProjectActionType.add)<ProjectAddParameter>(),
  requestAdd:  createAction(ProjectActionType.requestAdd)<ApiStatus>(),
  setAddModal: createAction(ProjectActionType.setAddModal)<boolean>(),
};
