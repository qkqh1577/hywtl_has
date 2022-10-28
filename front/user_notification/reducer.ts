import { UserNotificationVO } from 'user_notification/domain';
import { createReducer } from 'typesafe-actions';
import { UserNotificationActionType } from 'user_notification/action';
import { ApiStatus } from 'components/DataFieldProps';

export interface UserNotificationState {
  count: number;
  modal: boolean;
  list?: UserNotificationVO[];
  requestRead: ApiStatus;
  requestReadAll: ApiStatus;
  requestDelete: ApiStatus;
  requestDeleteAll: ApiStatus;
}

const initial: UserNotificationState = {
  count:            0,
  modal:            false,
  requestRead:      'idle',
  requestReadAll:   'idle',
  requestDelete:    'idle',
  requestDeleteAll: 'idle',
};

export const userNotificationReducer = createReducer(initial, {
  [UserNotificationActionType.setModal]:         (state,
                                                  action
                                                 ) => ({
    ...state,
    modal: action.payload,
  }),
  [UserNotificationActionType.setCount]:         (state,
                                                  action
                                                 ) => ({
    ...state,
    count: action.payload,
  }),
  [UserNotificationActionType.setList]:          (state,
                                                  action
                                                 ) => ({
    ...state,
    list: action.payload,
  }),
  [UserNotificationActionType.requestRead]:      (state,
                                                  action
                                                 ) => ({
    ...state,
    requestRead: action.payload,
  }),
  [UserNotificationActionType.requestReadAll]:   (state,
                                                  action
                                                 ) => ({
    ...state,
    requestReadAll: action.payload,
  }),
  [UserNotificationActionType.requestDelete]:    (state,
                                                  action
                                                 ) => ({
    ...state,
    requestDelete: action.payload,
  }),
  [UserNotificationActionType.requestDeleteAll]: (state,
                                                  action
                                                 ) => ({
    ...state,
    requestDeleteAll: action.payload,
  }),
});