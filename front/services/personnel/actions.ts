import { createAction } from 'typesafe-actions';
import Personnel from 'services/personnel/entity';
import { PersonnelAddParameter, PersonnelChangeParameter } from 'services/personnel/parameter';

export enum PersonnelActionType {
  getOne = 'personnel/getOne',
  setOne = 'personnel/setOne',
  add = 'personnel/add',
  change = 'personnel/change',
  remove = 'personnel/remove',
}

export const personnelActions = {
  getOne: createAction(PersonnelActionType.getOne)<number>(),
  setOne: createAction(PersonnelActionType.setOne)<Personnel | undefined>(),
  add: createAction(PersonnelActionType.add)<{
    params: PersonnelAddParameter;
    callback: (data?: Personnel) => void;
  }>(),
  change: createAction(PersonnelActionType.change)<{
    params: PersonnelChangeParameter;
    callback: (data?: Personnel) => void;
  }>(),
  remove: createAction(PersonnelActionType.remove)<{
    id: number;
    callback: () => void;
  }>(),
};