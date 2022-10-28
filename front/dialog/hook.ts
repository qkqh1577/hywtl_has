import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  AlertProps,
  ConfirmProps
} from 'dialog/parameter';
import { dialogAction } from 'dialog/action';
import { DialogStatus } from 'dialog/domain';

export default function useDialog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useCallback(
    (props: AlertProps | string,
     afterClose?: (() => void) | string
    ) => {
      if (typeof props === 'string') {
        return dispatch(dialogAction.openAlert({
          children:   props,
          afterClose: typeof afterClose === 'string' ? () => {
            navigate(afterClose);
          } : afterClose
        }));
      }
      return dispatch(dialogAction.openAlert(props));
    },
    [dispatch]);

  const error = useCallback(
    (message: string,
     afterClose?: (() => void) | string
    ) =>
      dispatch(dialogAction.openAlert({
        children:   message,
        status:     DialogStatus.ERROR,
        afterClose: typeof afterClose === 'string' ? () => {
          navigate(afterClose);
        } : afterClose
      })),
    [dispatch]);

  const confirm = useCallback(
    (props: ConfirmProps) =>
      dispatch(dialogAction.openConfirm(props)),
    [dispatch]);

  const rollback = useCallback(
    (afterConfirm: () => void) =>
      dispatch(dialogAction.openConfirm({
        children:    '작업을 취소하겠습니까? 변경 사항은 사라집니다.',
        confirmText: '작업 취소',
        status:      DialogStatus.WARN,
        afterConfirm,
      })), [dispatch]);

  return {
    alert,
    error,
    confirm,
    rollback,
  };
}