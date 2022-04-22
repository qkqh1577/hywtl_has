import Personnel, { ListPersonnel } from 'services/personnel/entity';
import { createReducer } from 'typesafe-actions';
import { PersonnelActionType } from 'services/personnel/actions';
import Page, { initial } from 'components/Page';

export type PersonnelState = {
  page: Page<ListPersonnel>;
  detail?: Personnel;
}

export const initState: PersonnelState = {
  page: initial
};

const personnelReducer = createReducer(initState, {
  [PersonnelActionType.setPage]: (state, action) => ({
    ...state,
    page: action.payload,
  }),
  [PersonnelActionType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload,
  }),
});

export default personnelReducer;
