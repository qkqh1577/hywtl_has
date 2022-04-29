import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'services/common/reducer';
import { useCallback } from 'react';
import { PasswordResetParameter } from 'services/user/password_reset/parameter';
import PasswordReset from 'services/user/password_reset/entity';
import { passwordResetActions } from 'services/user/password_reset/actions';

export default function usePasswordReset() {
  const passwordResetState = useSelector((state: RootState) => state.passwordReset);
  const dispatch = useDispatch();
  const reset = useCallback(
    (params: PasswordResetParameter, callback: (data?: PasswordReset) => void) =>
      dispatch(passwordResetActions.reset({ params, callback })),
    [dispatch],
  );

  return {
    passwordResetState,
    reset,
  };
}
