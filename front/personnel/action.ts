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

export enum PersonnelActionType {
  setId         = 'personnel/id/set',
  setOne        = 'personnel/one/set',
  setFilter     = 'personnel/filter/set',
  setPage       = 'personnel/page/set',
  update        = 'personnel/update',
  requestUpdate = 'personnel/update/request',
}

export const personnelAction = {
  setId:         createAction(PersonnelActionType.setId)<PersonnelId | undefined>(),
  setOne:        createAction(PersonnelActionType.setOne)<PersonnelVO | undefined>(),
  setFilter:     createAction(PersonnelActionType.setFilter)<PersonnelQuery>(),
  setPage:       createAction(PersonnelActionType.setPage)<Page<PersonnelShortVO> | undefined>(),
  update:        createAction(PersonnelActionType.update)<PersonnelParameter>(),
  requestUpdate: createAction(PersonnelActionType.requestUpdate)<ApiStatus>(),
};
