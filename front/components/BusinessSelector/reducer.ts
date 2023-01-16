import {BusinessId, BusinessManagerVO, BusinessVO} from "../../business/domain";
import {BusinessQuery} from "../../business/query";
import {createReducer} from "typesafe-actions";
import {BusinessSelectorActionType} from "./action";
import {ModalProps} from "./route/BusinessSelectorModalRoute";

export interface BusinessSelectorState {
  modal?: ModalProps;
  id?: BusinessId;
  detail?: BusinessVO;
  loading: boolean,
  list: BusinessVO[];
  filter: BusinessQuery;
  managerList: BusinessManagerVO[];
}

export const initialState: BusinessSelectorState = {
  loading: false,
  list: [],
  filter: {},
  managerList: [],
};

export const businessSelectorReducer = createReducer(initialState, {
  [BusinessSelectorActionType.setModal]: (state,
                                          action
  ) => ({
    ...state,
    modal: action.payload,
  }),
  [BusinessSelectorActionType.setFilter]: (state,
                                           action
  ) => ({
    ...state,
    filter: action.payload,
  }),
  [BusinessSelectorActionType.setLoading]: (state,
                                           action
  ) => ({
    ...state,
    loading: action.payload,
  }),
  [BusinessSelectorActionType.setList]: (state,
                                         action
  ) => ({
    ...state,
    list: action.payload,
  }),
  [BusinessSelectorActionType.setId]: (state,
                                       action
  ) => ({
    ...state,
    id: action.payload
  }),
  [BusinessSelectorActionType.setDetail]: (state,
                                           action
  ) => ({
    ...state,
    detail: action.payload,
  }),
  [BusinessSelectorActionType.setManagerList]: (state,
                                                action
  ) => ({
    ...state,
    managerList: action.payload,
  }),
});