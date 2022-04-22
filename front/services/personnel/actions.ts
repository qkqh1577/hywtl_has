import { createAction } from 'typesafe-actions';
import Personnel, { ListPersonnel } from 'services/personnel/entity';
import { PersonnelParameter, PersonnelQuery } from 'services/personnel/parameter';
import Page from 'components/Page';

export enum PersonnelActionType {
  getPage = 'personnel/getPage',
  setPage = 'personnel/setPage',
  getOne = 'personnel/getOne',
  setOne = 'personnel/setOne',
  update = 'personnel/update',
  remove = 'personnel/remove',
}

export const personnelActions = {
  getPage: createAction(PersonnelActionType.getPage)<PersonnelQuery>(),
  setPage: createAction(PersonnelActionType.setPage)<Page<ListPersonnel>>(),
  getOne: createAction(PersonnelActionType.getOne)<number>(),
  setOne: createAction(PersonnelActionType.setOne)<Personnel | undefined>(),
  update: createAction(PersonnelActionType.update)<{
    params: PersonnelParameter;
    callback: (data?: Personnel) => void;
  }>(),
  remove: createAction(PersonnelActionType.remove)<{
    id: number;
    callback: () => void;
  }>(),
};
