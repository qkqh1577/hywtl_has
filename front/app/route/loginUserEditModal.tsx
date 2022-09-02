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
  const { editModal } = useSelector((root: RootState) => root.user);

  const editLoginUser = useCallback((formikProps: FormikSubmit<FormikPartial<LoginUserEditParameter>>) =>
    dispatch(userAction.edit(formikProps)), [dispatch]);

  const initialValues: FormikPartial<UserShort> = useMemo(() => ({
    ...toPartial({
      username:       editModal?.username,
      name:           editModal?.name,
      email:          editModal?.email,
      englishName:    editModal?.englishName,
      birthDate:      editModal?.birthDate,
      sex:            editModal?.sex,
      mobilePhone:    editModal?.mobilePhone,
      privateEmail:   editModal?.privateEmail,
      emergencyPhone: editModal?.emergencyPhone,
      relationship:   editModal?.relationship,
      address:        editModal?.address,
    }, initialLoginUserEditParameter)
  }), [editModal]);

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
      open={!!editModal}
      onClose={onClose}
      formik={editModalFormik}
    />
  );
};
