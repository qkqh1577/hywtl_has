import {createAction} from 'typesafe-actions';

export enum SnackbarActionType {
  setOpen = 'snackbar/open/set',
  setMessage = 'snackbar/message/set',
  setSeverity = 'snackbar/severity/set',
  show = 'snackbar/show'
}

export enum SnackbarSeverityType {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}

interface SnackbarShowProps {
  message : string,
  severity: SnackbarSeverityType
}

export const snackbarAction = {
  setOpen: createAction(SnackbarActionType.setOpen)<boolean>(),
  setMessage: createAction(SnackbarActionType.setMessage)<string>(),
  setSeverity: createAction(SnackbarActionType.setSeverity)<SnackbarSeverityType>(),
  show: createAction(SnackbarActionType.show)<SnackbarShowProps>()
}
