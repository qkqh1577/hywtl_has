import { createAction } from 'typesafe-actions';
import { FormikSubmit } from 'type/Form';
import { PersonnelQuery } from 'personnel/query';
import Page from 'type/Page';
import {
  PersonnelShortVO,
  PersonnelVO,
} from 'personnel/domain';
import { PersonnelParameter } from 'personnel/parameter';

export enum PersonnelAction {
  setId           = 'personnel/id/set',
  setOne          = 'personnel/one/set',
  setFilter       = 'personnel/filter/set',
  setPage         = 'personnel/page/set',
  update          = 'personnel/update',
}

export const personnelAction = {
  setId:           createAction(PersonnelAction.setId)<number>(),
  setOne:          createAction(PersonnelAction.setOne)<PersonnelVO>(),
  setFilter:       createAction(PersonnelAction.setFilter)<FormikSubmit<PersonnelQuery>>(),
  setPage:         createAction(PersonnelAction.setPage)<Page<PersonnelShortVO> | undefined>(),
  update:          createAction(PersonnelAction.update)<FormikSubmit<PersonnelParameter>>(),
};
