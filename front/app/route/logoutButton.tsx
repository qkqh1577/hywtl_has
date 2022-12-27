import LogoutButton from 'app/view/LogoutButton';
import React, {
  useCallback,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { loginAction } from 'login/action';
import { RootState } from 'services/reducer';
import { closeStatus } from 'components/DataFieldProps';
import { useNavigate } from 'react-router-dom';

export default function LogoutButtonRoute() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { requestLogout } = useSelector((root: RootState) => root.login);
  const onLogout = useCallback(() => dispatch(loginAction.logout()), [dispatch]);

  useEffect(() => {
    closeStatus(requestLogout, () => {
      dispatch(loginAction.setDetail(undefined));
      navigate('/login');
    }, () => {
      dispatch(loginAction.requestLogout('idle'));
    });
  }, [requestLogout]);
  return (
    <LogoutButton onLogout={onLogout} />
  );
}
