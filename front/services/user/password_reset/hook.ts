import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import {
  PasswordReset,
  PasswordResetParameter,
  passwordResetActions,
} from 'services/user/password_reset';

export default function usePasswordReset() {
  const state = useSelector((state: RootState) => state.passwordReset);
  const dispatch = useDispatch();
  const reset = useCallback(
    (params: PasswordResetParameter, callback: (data?: PasswordReset) => void) =>
      dispatch(passwordResetActions.reset({ params, callback })),
    [dispatch],
  );

  return {
    state,
    reset,
  };
}
