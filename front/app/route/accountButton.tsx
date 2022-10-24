import React, { useCallback } from 'react';
import AccountButton from 'app/view/AccountButton';
import { useDispatch } from 'react-redux';
import { loginAction } from 'login/action';

export default function AccountButtonRoute() {
  const dispatch = useDispatch();
  const openModal = useCallback(() => dispatch(loginAction.changeModal(true)), [dispatch]);

  return (
    <AccountButton openModal={openModal} />
  );
}