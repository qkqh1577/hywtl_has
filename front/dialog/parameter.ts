import {
  AlertVO,
  DialogStatus
} from 'dialog/domain';
import { DefaultFunction } from 'type/Function';
import { PayloadActionCreator } from 'typesafe-actions/dist/type-helpers';
import { getAxiosError } from 'type/Error';

export interface AlertProps
  extends Partial<AlertVO> {}

export interface ConfirmProps
  extends Partial<AlertVO> {
  afterConfirm: DefaultFunction;
  confirmText: string;
}

export function getErrorProps<TPayload>(
  action: PayloadActionCreator<string, TPayload>,
  e: unknown
): AlertProps {
  const props: AlertProps = {
    title:     'ERROR',
    closeText: '확인',
    status:    DialogStatus.ERROR,
  };
  const error = getAxiosError(action, e);
  if (error?.response?.data) {
    const data = error.response.data;
    props.children = data.message;
  }

  return props;
}