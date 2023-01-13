import {createReducer} from "typesafe-actions";
import {SnackbarActionType, SnackbarSeverityType} from "./action";

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarSeverityType;
}

const initial: SnackbarState = {
  open: false,
  message: 'empty',
  severity: SnackbarSeverityType.info
}

export const snackbarReducer = createReducer(initial, {
  [SnackbarActionType.setOpen]: (state, action) => {
    const {payload} = action;
    return {
      ...state,
      open: payload
    }
  },
  [SnackbarActionType.setMessage]: (state, action) => {
    const {payload} = action;
    return {
      ...state,
      message: payload
    }
  },
  [SnackbarActionType.setSeverity]: (state, action) => {
    const {payload} = action;
    return {
      ...state,
      severity: payload
    }
  }
})