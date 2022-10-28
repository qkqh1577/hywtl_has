import React, {
  useCallback,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { UserNotificationId, } from 'user_notification/domain';
import { userNotificationAction } from 'user_notification/action';
import UserNotificationModal from 'user_notification/view';
import { closeStatus } from 'components/DataFieldProps';

export default function UserNotificationModalRoute() {
  const dispatch = useDispatch();
  const {
          modal,
          list,
          requestRead,
          requestReadAll,
          requestDelete,
          requestDeleteAll
        } = useSelector((root: RootState) => root.userNotification);

  const onDelete = useCallback((id: UserNotificationId) =>
      dispatch(userNotificationAction.deleteOne(id)),
    [dispatch]);

  const onDeleteAll = useCallback(() =>
    dispatch(userNotificationAction.deleteAll()), [dispatch]);

  const onRead = useCallback((id: UserNotificationId) =>
      dispatch(userNotificationAction.read(id))
    , [dispatch]);

  const onReadAll = useCallback(() => dispatch(userNotificationAction.readAll()), [dispatch]);

  const onClose = useCallback(() => dispatch(userNotificationAction.setModal(false)), [dispatch]);

  const reload = useCallback(() => {
    dispatch(userNotificationAction.requestCount());
    dispatch(userNotificationAction.requestList());
  }, [dispatch]);

  useEffect(() => {
    if (modal) {
      dispatch(userNotificationAction.requestList());
    }
    else {
      dispatch(userNotificationAction.setList(undefined));
    }
  }, [modal]);

  useEffect(() => {
    closeStatus(requestRead, reload, undefined);
  }, [requestRead]);

  useEffect(() => {
    closeStatus(requestReadAll, reload, undefined);
  }, [requestReadAll]);

  useEffect(() => {
    closeStatus(requestDelete, reload, undefined);
  }, [requestDelete]);

  useEffect(() => {
    closeStatus(requestDeleteAll, reload, undefined);
  }, [requestDeleteAll]);

  return (
    <UserNotificationModal
      open={modal}
      list={list}
      onClose={onClose}
      onRead={onRead}
      onReadAll={onReadAll}
      onDelete={onDelete}
      onDeleteAll={onDeleteAll}
    />
  );
}
