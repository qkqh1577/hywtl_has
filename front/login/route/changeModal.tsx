import React, {
  useCallback,
  useEffect,
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { RootState } from 'services/reducer';
import { LoginChangeParameter } from 'login/parameter';
import { loginAction } from 'login/action';
import LoginChangeModal from 'login/view/ChangeModal';
import { ApiStatus } from 'components/DataFieldProps';
import useDialog from 'components/Dialog';

export default function LoginChangeModalRoute() {
  const dispatch = useDispatch();
  const { error, alert } = useDialog();
  const { detail: loginUser, changeModal, requestChange } = useSelector((root: RootState) => root.login);

  const change = useCallback((formikProps: LoginChangeParameter) =>
    dispatch(loginAction.change(formikProps)), [dispatch]);

  const formik = useFormik<LoginChangeParameter>({
      initialValues: {} as unknown as LoginChangeParameter,
      onSubmit:      (values) => {
        change(values);
      }
    }
  );

  useEffect(() => {
    if (changeModal) {
      dispatch(loginAction.requestDetail());
    }
  }, [changeModal]);

  useEffect(() => {
    if (loginUser) {
      formik.setValues({
        ...loginUser
      } as LoginChangeParameter);
    }
  }, [loginUser]);

  useEffect(() => {
    if (requestChange === ApiStatus.DONE) {
      alert('변경하였습니다.');
      dispatch(loginAction.changeModal(false));
      dispatch(loginAction.requestChange(ApiStatus.IDLE));
    }
    else if (requestChange === ApiStatus.FAIL) {
      error('변경에 실패하였습니다.');
      dispatch(loginAction.requestChange(ApiStatus.IDLE));
    }
  }, [requestChange]);

  const onClose = useCallback(() => dispatch(loginAction.changeModal(false)), [dispatch]);

  return (
    <FormikProvider value={formik}>
      <LoginChangeModal
        open={changeModal}
        onClose={onClose}
        onResetPassword={() => {
          console.log('change password requested');
        }}
      />
    </FormikProvider>
  );
};
