import React, { useCallback } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { loginAction } from 'login/action';
import LoginModal from 'login/view/LoginModal';
import { RootState } from 'services/reducer';

export default function LoginModalRoute(props) {
  const dispatch = useDispatch();
  const { isOpenLoginModal } = useSelector((root: RootState) => root.login);
  const onClose = useCallback(() => dispatch(loginAction.setLoginModal(false)), [dispatch]);
  return (
    <LoginModal
      open={isOpenLoginModal}
      onClose={onClose}
    />
  );
}
