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
  initialPasswordParameter,
  PasswordChangeParameter,
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

function Element(props) {
  const dispatch = useDispatch();
  const { search, } = useLocation();
  const navigate = useNavigate();
  const [queryString, setQueryString] = useState<UrlValidateParameter>(qs.parse(search.slice(1)) as unknown as UrlValidateParameter);

  const { passwordValidation } = useSelector((root: RootState) => root.login);
  const { isUrlValidated } = useSelector((root: RootState) => root.user);
  const onChange = useCallback((formikProps: PasswordChangeParameter) => dispatch(loginAction.changePassword(formikProps)), [dispatch]);
  const onValidate = useCallback((urlValidateParams: UrlValidateParameter) => dispatch(userAction.validateUrlForPasswordReset(urlValidateParams)), [dispatch]);
  const formik = useFormik<PasswordChangeParameter>({
    initialValues: initialPasswordParameter,
    onSubmit:      (values) => {
      onChange(values);
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
