import React, { useCallback } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { useFormik } from 'formik';
import {
  initialUserNotificationVO,
  UserNotificationId,
  UserNotificationVO
} from 'user_notification/domain';
import { userNotificationAction } from 'user_notification/action';
import UserNotificationModal from 'user_notification/view';

export default function UserNotificationModalRoute() {
  const dispatch = useDispatch();
  const { list } = useSelector((root: RootState) => root.userNotification);

  const formik = useFormik<UserNotificationVO>({
    enableReinitialize: true,
    initialValues:      initialUserNotificationVO,
    onSubmit:           (values,
                         helper
                        ) => {
    }
  });
  const onDelete = useCallback((id: UserNotificationId) =>
      dispatch(userNotificationAction.deleteOne(id)),
    [dispatch]);

  const onDeleteAll = useCallback(() => dispatch(userNotificationAction.deleteAll()), [dispatch])

  const onRead = useCallback((id: UserNotificationId) =>
      dispatch(userNotificationAction.read(id))
    , [dispatch]);

  const onReadAll = useCallback(() => dispatch(userNotificationAction.readAll()), [dispatch])

  const onClose = useCallback(() =>
    dispatch(userNotificationAction.setList(undefined)), [dispatch]);

  return (
    <UserNotificationModal
      open={!!list}
      onClose={onClose}
      formik={formik}
      list={list}
      onRead={onRead}
      onReadAll={onReadAll}
      onDelete={onDelete}
      onDeleteAll={onDeleteAll}
    />
  );
}
