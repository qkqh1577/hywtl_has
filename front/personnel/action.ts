import { createAction } from 'typesafe-actions';
import { PersonnelQuery } from 'personnel/query';
import Page from 'type/Page';
import {
  PersonnelId,
  PersonnelShortVO,
  PersonnelVO,
} from 'personnel/domain';
import { PersonnelParameter } from 'personnel/parameter';
import { ApiStatus } from 'components/DataFieldProps';

export enum PersonnelAction {
  setId         = 'personnel/id/set',
  setOne        = 'personnel/one/set',
  setFilter     = 'personnel/filter/set',
  setPage       = 'personnel/page/set',
  update        = 'personnel/update',
  requestUpdate = 'personnel/update/request',
}

export const personnelAction = {
  setId:         createAction(PersonnelAction.setId)<PersonnelId | undefined>(),
  setOne:        createAction(PersonnelAction.setOne)<PersonnelVO | undefined>(),
  setFilter:     createAction(PersonnelAction.setFilter)<PersonnelQuery>(),
  setPage:       createAction(PersonnelAction.setPage)<Page<PersonnelShortVO> | undefined>(),
  update:        createAction(PersonnelAction.update)<PersonnelParameter>(),
  requestUpdate: createAction(PersonnelAction.requestUpdate)<ApiStatus>(),
};
