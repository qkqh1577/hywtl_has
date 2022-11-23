import { createReducer } from 'typesafe-actions';
import { ProgressActionType } from 'components/Progress/action';

export interface ProgressState {
  progress?: boolean;
}

const initial: ProgressState = {};

export const progressReducer = createReducer(initial, {
  [ProgressActionType.progress]:  (state,
                               action
                              ) => {
    const { payload } = action;
    return {
      ...state,
      progress: payload,
    };
  }
});

