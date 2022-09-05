import React, {
  useCallback,
  useMemo,
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  FormikPartial,
  FormikSubmit,
  toPartial
} from 'type/Form';
import {
  initialLoginUserEditParameter,
  LoginUserEditParameter
} from 'user/parameter';
import { userAction } from 'user/action';
import { useFormik } from 'formik';
import LoginUserEditModal from 'app/view/App/LoginUserEditModal';
import { RootState } from 'services/reducer';
import {
  UserShort,
} from 'user/domain';

export default function LoginUserEditModalRoute() {
  const dispatch = useDispatch();
  const { loginUser } = useSelector((root: RootState) => root.user);

  const editLoginUser = useCallback((formikProps: FormikSubmit<FormikPartial<LoginUserEditParameter>>) =>
    dispatch(userAction.edit(formikProps)), [dispatch]);

  const initialValues: FormikPartial<UserShort> = useMemo(() => ({
    ...toPartial({
      username:       loginUser?.username,
      name:           loginUser?.name,
      email:          loginUser?.email,
      englishName:    loginUser?.englishName,
      birthDate:      loginUser?.birthDate,
      sex:            loginUser?.sex,
      mobilePhone:    loginUser?.mobilePhone,
      privateEmail:   loginUser?.privateEmail,
      emergencyPhone: loginUser?.emergencyPhone,
      relationship:   loginUser?.relationship,
      address:        loginUser?.address,
    }, initialLoginUserEditParameter),
  }), [loginUser]);

  const editModalFormik = useFormik<FormikPartial<LoginUserEditParameter>>({
      enableReinitialize: true,
      initialValues,
      onSubmit:      (values,
                      helper
                     ) => {
        console.log("values : ", values);
        editLoginUser({ values, ...helper });
      }
    }
  );

  const onClose = useCallback(() =>
    dispatch(userAction.editModal(undefined)), [dispatch]
  );

  return (
    <LoginUserEditModal
      open={!!loginUser}
      onClose={onClose}
      formik={editModalFormik}
    />
  );
};
