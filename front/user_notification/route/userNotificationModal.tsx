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
  console.log('list: ', list);

  const formik = useFormik<UserNotificationVO>({
    enableReinitialize: true,
    initialValues:      initialUserNotificationVO,
    onSubmit:           (values,
                         helper
                        ) => {
      console.log('submit??? ');
    }
  });
  const onDelete = useCallback((id: UserNotificationId) =>
      dispatch(userNotificationAction.deleteOne(id)),
    [dispatch]);

  const onRead = useCallback((id: UserNotificationId) =>
      dispatch(userNotificationAction.read(id))
    , [dispatch]);

  const onClose = useCallback(() =>
    dispatch(userNotificationAction.setList(undefined)), [dispatch]);

  return (
    <UserNotificationModal
      open={!!list}
      onClose={onClose}
      formik={formik}
      list={list}
      onDelete={onDelete}
      onRead={onRead}
    />
  );
}
