import LogoutButton from 'app/view/App/LogoutButton';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from 'login/action';

export default function LogoutButtonRoute() {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => dispatch(loginAction.logout()), [dispatch]);

  return (
    <LogoutButton onLogout={onLogout} />
  );
}