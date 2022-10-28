import { createAction } from 'typesafe-actions';
import {
  UserNotificationId,
  UserNotificationVO
} from 'user_notification/domain';
import { ApiStatus } from 'components/DataFieldProps';

export enum UserNotificationActionType {
  requestCount     = 'user-notification/count/request',
  setCount         = 'user-notification/count/set',
  requestList      = 'user-notification/list/request',
  setList          = 'user-notification/list/set',
  read             = 'user-notification/read',
  requestRead      = 'user-notification/read/request',
  readAll          = 'user-notification/read-all',
  requestReadAll   = 'user-notification/read-all/request',
  deleteOne        = 'user-notification/delete',
  requestDelete    = 'user-notification/delete/request',
  deleteAll        = 'user-notification/delete-all',
  requestDeleteAll = 'user-notification/delete-all/request',
  setModal         = 'user-notification/modal',

}

export const userNotificationAction = {
  requestCount:     createAction(UserNotificationActionType.requestCount)(),
  setCount:         createAction(UserNotificationActionType.setCount)<number>(),
  requestList:      createAction(UserNotificationActionType.requestList)(),
  setList:          createAction(UserNotificationActionType.setList)<UserNotificationVO[] | undefined>(),
  read:             createAction(UserNotificationActionType.read)<UserNotificationId>(),
  requestRead:      createAction(UserNotificationActionType.requestRead)<ApiStatus>(),
  readAll:          createAction(UserNotificationActionType.readAll)(),
  requestReadAll:   createAction(UserNotificationActionType.requestReadAll)<ApiStatus>(),
  deleteOne:        createAction(UserNotificationActionType.deleteOne)<UserNotificationId>(),
  requestDelete:    createAction(UserNotificationActionType.requestDelete)<ApiStatus>(),
  deleteAll:        createAction(UserNotificationActionType.deleteAll)(),
  requestDeleteAll: createAction(UserNotificationActionType.requestDeleteAll)<ApiStatus>(),
  setModal:         createAction(UserNotificationActionType.setModal)<boolean>(),
};
