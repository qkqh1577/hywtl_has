import { createAction } from 'typesafe-actions';
import {
  AlertProps,
  ConfirmProps,
} from 'dialog/parameter';

export enum DialogActionType {
  openAlert   = 'system/alert/open',
  openError   = 'system/error/open',
  openConfirm = 'system/confirm/open',
  close       = 'system/dialog/close',
}

export const dialogAction = {
  openAlert:   createAction(DialogActionType.openAlert)<AlertProps | string>(),
  openError:   createAction(DialogActionType.openError)<AlertProps | string>(),
  openConfirm: createAction(DialogActionType.openConfirm)<ConfirmProps>(),
  close:       createAction(DialogActionType.close)(),
};