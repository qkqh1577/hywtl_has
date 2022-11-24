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
import { closeStatus } from 'components/DataFieldProps';
import { addressModalAction } from 'components/AddressModal/action';
import { AddressModal } from 'components/AddressModal/AddressModal';

export default function LoginChangeModalRoute() {
  const dispatch = useDispatch();
  const { detail: loginUser, changeModal, requestChange } = useSelector((root: RootState) => root.login);
  const openPasswordChangeModal = useCallback(() => dispatch(loginAction.passwordChangeModal(true)), [dispatch]);
  const openAddressModal = useCallback(() => dispatch(addressModalAction.addressModal(true)), [dispatch]);

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
    closeStatus(requestChange, () => {
      dispatch(loginAction.changeModal(false));
    }, () => {
      dispatch(loginAction.requestChange('idle'));

    });
  }, [requestChange]);

  const onClose = useCallback(() => dispatch(loginAction.changeModal(false)), [dispatch]);

  return (
    <FormikProvider value={formik}>
      <LoginChangeModal
        open={changeModal}
        onClose={onClose}
        onResetPassword={() => {
          openPasswordChangeModal();
          onClose();
        }}
        onAddressModal={() => {
          openAddressModal();
        }}
      />
      <AddressModal formik={formik} fieldName={'address'} />
    </FormikProvider>
  );
};
