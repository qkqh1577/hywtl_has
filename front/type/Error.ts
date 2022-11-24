import {
  EmptyActionCreator,
  PayloadActionCreator
} from 'typesafe-actions/dist/type-helpers';
import { AxiosError } from 'axios';

type Action<TPayload> = PayloadActionCreator<string, TPayload> | EmptyActionCreator<string>;

export interface ApiErrorData {
  code: string;
  message: string;
}

export function getAxiosError<TPayload>(
  action: Action<TPayload>,
  e: unknown
) {
  return e as AxiosError<ApiErrorData, TPayload>;
}

export function getErrorMessage<TPayload>(action: Action<TPayload>,
                                          e: unknown
) {
  const axiosError = getAxiosError(action, e);
  if (axiosError.response?.data) {
    return axiosError.response.data.message;
  }
  return '오류가 발생하였습니다.';
}

export function getErrorCode<TPayload>(action: Action<TPayload>,
                                          e: unknown
) {
  const axiosError = getAxiosError(action, e);
  if (axiosError.response?.data) {
    return axiosError.response.data.code;
  }
  return '오류가 발생하였습니다.';
}

