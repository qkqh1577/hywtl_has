import Personnel from 'services/personnel/entity';
import { createReducer } from 'typesafe-actions';
import { PersonnelActionType } from 'services/personnel/actions';

export type PersonnelState = {
  detail?: Personnel;
}

export const initState: PersonnelState = {};

const personnelReducer = createReducer(initState, {
  [PersonnelActionType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload,
  }),
});

export default personnelReducer;
