import { createAction } from 'typesafe-actions';

export enum ProgressActionType{
  progress = 'progress/state',
}

export const progressAction = {
  progress: createAction(ProgressActionType.progress)<Boolean>(),
}
