import {
  AlertVO,
  ConfirmVO,
  DialogStatus
} from 'dialog/domain';
import { createReducer } from 'typesafe-actions';
import { DialogActionType } from 'dialog/action';

export interface DialogState {
  alertProps?: AlertVO;
  confirmProps?: ConfirmVO;
}

const initial: DialogState = {};

export const dialogReducer = createReducer(initial, {
  [DialogActionType.openAlert]:   (state,
                                   action
                                  ) => {
    const { payload } = action;
    const alertProps: AlertVO = {
      title:      typeof payload !== 'string' && payload.title ? payload.title : 'ALERT',
      status:     typeof payload !== 'string' && payload.status ? payload.status : DialogStatus.OK,
      closeText:  typeof payload !== 'string' && payload.closeText ? payload.closeText : '닫기',
      children:   typeof payload === 'string' ? payload : payload.children,
      afterClose: typeof payload !== 'string' ? payload.afterClose : undefined,
    };
    return {
      ...state,
      alertProps
    };
  },
  [DialogActionType.openError]:   (state,
                                   action
                                  ) => {
    const { payload } = action;
    const alertProps: AlertVO = {
      title:      typeof payload !== 'string' && payload.title ? payload.title : 'ERROR',
      status:     typeof payload !== 'string' && payload.status ? payload.status : DialogStatus.ERROR,
      closeText:  typeof payload !== 'string' && payload.closeText ? payload.closeText : '닫기',
      children:   typeof payload === 'string' ? payload : payload.children,
      afterClose: typeof payload !== 'string' ? payload.afterClose : undefined,
    };
    return {
      ...state,
      alertProps
    };
  },
  [DialogActionType.openConfirm]: (state,
                                   action
                                  ) => {
    const { payload } = action;
    const confirmProps: ConfirmVO = {
      title:        payload.title ?? 'CONFIRM',
      status:       payload.status ? payload.status : DialogStatus.OK,
      closeText:    payload.closeText ?? '취소',
      afterClose:   payload.afterClose,
      children:     payload.children,
      afterConfirm: payload.afterConfirm,
      confirmText:  payload.confirmText ?? '확인',
    };
    return {
      ...state,
      confirmProps,
    };
  },
  [DialogActionType.close]:       () => ({})
});