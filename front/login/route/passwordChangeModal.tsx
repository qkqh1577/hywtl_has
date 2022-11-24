import React, {
  useCallback,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { loginAction } from 'login/action';
import PasswordChangeModal from 'login/view/PasswordChangeModal';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  initialPasswordParameter,
  PasswordChangeParameter
} from 'login/parameter';

function PasswordChangeModalRoute(props) {
  const dispatch = useDispatch();
  const { detail: loginUser, passwordChangeModal, passwordValidation } = useSelector((root: RootState) => root.login);
  const onChange = useCallback((formikProps: PasswordChangeParameter) => dispatch(loginAction.changePassword(formikProps)), [dispatch]);
  const onClose = useCallback(() => dispatch(loginAction.passwordChangeModal(false)), [dispatch]);
  const formik = useFormik<PasswordChangeParameter>({
    initialValues: initialPasswordParameter,
    onSubmit:      (values) => {
      onChange({ ...values, id: loginUser!.id });
    }
  });
  useEffect(() => {
    if (passwordChangeModal) {
      formik.resetForm();
      dispatch(loginAction.passwordValidation(undefined));
    }
  }, [passwordChangeModal]);
  return (
    <FormikProvider value={formik}>
      <PasswordChangeModal
        open={passwordChangeModal}
        onClose={onClose}
        passwordValidation={passwordValidation}
      />
    </FormikProvider>
  );
}

export default PasswordChangeModalRoute;
