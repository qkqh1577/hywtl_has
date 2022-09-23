import { createAction } from 'typesafe-actions';
import {
  UserNotificationId,
  UserNotificationVO
} from 'user_notification/domain';

export enum UserNotificationActionType {
  requestCount = 'user-notification/count/request',
  setCount     = 'user-notification/count/set',
  requestList  = 'user-notification/list/request',
  setList      = 'user-notification/list/set',
  read         = 'user-notification/read',
  deleteOne    = 'user-notification/delete',

}

export const userNotificationAction = {
  requestCount: createAction(UserNotificationActionType.requestCount)(),
  setCount:     createAction(UserNotificationActionType.setCount)<number>(),
  requestList:  createAction(UserNotificationActionType.requestList)(),
  setList:      createAction(UserNotificationActionType.setList)<UserNotificationVO[] | undefined>(),
  read:         createAction(UserNotificationActionType.read)<UserNotificationId>(),
  deleteOne:    createAction(UserNotificationActionType.deleteOne)<UserNotificationId>(),
};