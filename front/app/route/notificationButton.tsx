import React, {
  useCallback,
  useEffect
} from 'react';
import NotificationButton from 'app/view/App/NotificationButton';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { useLocation } from 'react-router-dom';
import { userNotificationAction } from 'user_notification/action';

export default function NotificationButtonRoute() {

  const dispatch = useDispatch();
  const { count } = useSelector((root: RootState) => root.userNotification);
  const { pathname } = useLocation();

  const onModalOpen = useCallback(() => dispatch(userNotificationAction.requestList()), [dispatch]);

  useEffect(() => {
    dispatch(userNotificationAction.requestCount());
  }, [pathname]);

  return (
    <NotificationButton
      count={count}
      onClick={onModalOpen}
    />
  );
}
