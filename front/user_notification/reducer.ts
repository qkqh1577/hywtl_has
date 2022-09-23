import { UserNotificationVO } from 'user_notification/domain';
import { createReducer } from 'typesafe-actions';
import { UserNotificationActionType } from 'user_notification/action';

export interface UserNotificationState {
  count: number;
  list?: UserNotificationVO[];
}

const initial: UserNotificationState = {
  count: 0,
};

export const userNotificationReducer = createReducer(initial, {
  [UserNotificationActionType.setCount]: (state,
                                          action
                                         ) => ({
    ...state,
    count: action.payload,
  }),
  [UserNotificationActionType.setList]:  (state,
                                          action
                                         ) => ({
    ...state,
    list: action.payload,
  }),
});