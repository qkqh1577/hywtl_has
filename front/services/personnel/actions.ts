import { createAction } from 'typesafe-actions';
import Personnel from 'services/personnel/entity';
import { PersonnelParameter } from 'services/personnel/parameter';

export enum PersonnelActionType {
  getOne = 'personnel/getOne',
  setOne = 'personnel/setOne',
  update = 'personnel/update',
  remove = 'personnel/remove',
}

export const personnelActions = {
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
