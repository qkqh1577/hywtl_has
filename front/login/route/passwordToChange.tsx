import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import { AppRoute } from 'services/routes';
import FormToChangePassword from 'login/view/FormToChangePassword';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import {
  PasswordResetParameter,
  UrlValidateParameter
} from 'login/parameter';
import { loginAction } from 'login/action';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import qs from 'qs';
import { userAction } from 'user/action';
import { closeStatus } from 'components/DataFieldProps';
import useDialog from 'dialog/hook';

function Element(props) {
  const dispatch = useDispatch();
  const { confirm } = useDialog();
  const { search, } = useLocation();
  const navigate = useNavigate();
  const [queryString, setQueryString] = useState<UrlValidateParameter>(qs.parse(search.slice(1)) as unknown as UrlValidateParameter);

  const { passwordValidation, requestReset } = useSelector((root: RootState) => root.login);
  const { isUrlValidated } = useSelector((root: RootState) => root.user);
  const onReset = useCallback((params: PasswordResetParameter) => dispatch(loginAction.reset(params)), [dispatch]);
  const onValidate = useCallback((urlValidateParams: UrlValidateParameter) => dispatch(userAction.validateUrlForPasswordReset(urlValidateParams)), [dispatch]);
  const formik = useFormik<PasswordResetParameter>({
    initialValues: { token: queryString.token, newPassword: '', newPasswordConfirm: '' },
    onSubmit:      (values) => {
      onReset({ ...values, token: queryString.token });
    }
  });

  useEffect(() => {
    if (!isUrlValidated) {
      navigate('/user/password-reset/invalid');
    }
  }, [isUrlValidated]);
  useEffect(() => {
    if (!queryString.token) {
      navigate('/user/password-reset/invalid');
    }
    onValidate(queryString);
  }, []);

  useEffect(() => {
    if (passwordValidation && (passwordValidation.code === 'password_reset_token.expired')) {
      navigate('/user/password-reset/invalid');
    }
  }, [passwordValidation]);

  useEffect(() => {
    closeStatus(requestReset, () => {
      dispatch(loginAction.passwordValidation(undefined));
      confirm({
        children:     '비밀번호 재설정이 완료됐습니다. 로그인 페이지로 이동합니다.',
        confirmText:  '확인',
        afterConfirm: () => {
          navigate('/login');
        }
      });
    }, () => {
      dispatch(loginAction.requestReset(('idle')));
    });
  }, [requestReset]);

  return (
    <FormikProvider value={formik}>
      <FormToChangePassword
        passwordValidation={passwordValidation} />
    </FormikProvider>
  );
}

const passwordToChangeRoute: AppRoute = {
  path:    '/user/password-reset',
  element: <Element />
};

export default passwordToChangeRoute;
