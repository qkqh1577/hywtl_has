import React, {
  useCallback,
  useMemo,
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  FormikSubmit,
} from 'type/Form';
import {
  LoginUserEditParameter
} from 'user/parameter';
import { userAction } from 'user/action';
import { useFormik } from 'formik';
import LoginUserEditModal from 'app/view/App/LoginUserEditModal';
import { RootState } from 'services/reducer';
import { UserShortVO } from 'user/domain';

export default function LoginUserEditModalRoute() {
  const dispatch = useDispatch();
  const { loginUser } = useSelector((root: RootState) => root.user);

  const editLoginUser = useCallback((formikProps: FormikSubmit<LoginUserEditParameter>) =>
    dispatch(userAction.edit(formikProps)), [dispatch]);

  const initialValues: UserShortVO = useMemo(() => ({
    username:       loginUser?.username,
    name:           loginUser?.name,
    email:          loginUser?.email,
    profile:        loginUser?.profile,
    englishName:    loginUser?.englishName,
    birthDate:      loginUser?.birthDate,
    sex:            loginUser?.sex,
    mobilePhone:    loginUser?.mobilePhone,
    privateEmail:   loginUser?.privateEmail,
    emergencyPhone: loginUser?.emergencyPhone,
    relationship:   loginUser?.relationship,
    address:        loginUser?.address,
  }), [loginUser]);

  const editModalFormik = useFormik<UserShortVO>({
      enableReinitialize: true,
      initialValues,
      onSubmit:           (values,
                           helper
                          ) => {
        console.log(initialValues.profile);
        console.log("loginUserEditModal.tsx in editModalFormik method's values: ", values.profile);
        editLoginUser({
          values: {
            englishName:    values.englishName,
            birthDate:      values.birthDate,
            sex:            values.sex,
            mobilePhone:    values.mobilePhone,
            privateEmail:   values.privateEmail,
            emergencyPhone: values.emergencyPhone,
            relationship:   values.relationship,
            address:        values.address,
            profile:        values.profile!.multipartFile,
          },
          ...helper });
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
