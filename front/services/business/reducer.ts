import { createReducer } from 'typesafe-actions';
import Page, { initial } from 'components/Page';
import { Business, BusinessList, BusinessActionType } from 'services/business';

export type BusinessState = {
  page: Page<BusinessList>
  list?: Business[]
  detail?: Business
};

export const initState: BusinessState = {
  page: initial
};

const businessReducer = createReducer(initState, {
  [BusinessActionType.setPage]: (state, action) => ({
    ...state,
    page: action.payload
  }),
  [BusinessActionType.setOne]: (state, action) => ({
    ...state,
    detail: action.payload
  }),
  [BusinessActionType.setAll]: (state, action) => ({
    ...state,
    list: action.payload
  })
});

export default businessReducer;
