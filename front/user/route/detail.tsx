import React, {
  useCallback,
  useEffect
} from 'react';
import useId from 'services/useId';
import useDialog from 'dialog/hook';
import {
  UserId,
  UserVO
} from 'user/domain';
import UserDetail from 'user/view/Detail';
import { AppRoute } from 'services/routes';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { userAction } from 'user/action';
import {
  initialUserParameter,
  UserChangeParameter,
  UserPasswordChangeParameter
} from 'user/parameter';
import { RootState } from 'services/reducer';
import { closeStatus } from 'components/DataFieldProps';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const { detail, requestChange } = useSelector((root: RootState) => root.user);
  const { confirm, rollback, alert } = useDialog();
  const change = useCallback((formikProps: UserChangeParameter) => dispatch(userAction.change(formikProps)), [dispatch]);
  const sendEmail = useCallback((email: UserPasswordChangeParameter) => dispatch(userAction.requestEmailToChangePassword(email)), [dispatch]);
  const formik = useFormik<UserChangeParameter>({
    initialValues: initialUserParameter,
    onSubmit:      (values) => {
      change({
        id:           values.id,
        name:         values.name,
        email:        values.email,
        role:         values.role,
        departmentId: values.departmentId ?? (values as unknown as UserVO).department.id,
      });
    }
  });

  useEffect(() => {
    dispatch(userAction.setId(id ? UserId(id) : undefined));
  }, [id]);

  useEffect(() => {
    if (detail) {
      formik.setValues({
        ...detail,
        departmentId: detail.department.id,
        edit:         false,
      } as unknown as UserChangeParameter);
    }
    else {
      formik.setValues(initialUserParameter);
    }
  }, [detail]);

  useEffect(() => {
    closeStatus(requestChange, () => {
      alert('변경하였습니다.');
      dispatch(userAction.setId(UserId(id!)));
    }, () => {
      formik.setSubmitting(false);
      dispatch(userAction.requestChange('idle'));
    });
  }, [requestChange]);

  return (
    <FormikProvider value={formik}>
      <UserDetail
        onCancel={() => {
          rollback(() => {
            if (detail) {
              formik.setValues({
                ...detail,
                edit: false,
              } as unknown as UserChangeParameter);
            }
          });
        }}
        onPasswordChange={() => {
          confirm({
            children:     '비밀번호 변경 안내 메일을 발송하겠습니까?',
            confirmText:  '발송',
            afterConfirm: () => {
              if (detail && detail.username) {
                sendEmail({ username: detail.username });
              }
            }
          });
        }}
      />
    </FormikProvider>
  );
}

const userDetailRoute: AppRoute = {
  path:    '/admin/user-management/:id',
  element: <Element />
};

export default userDetailRoute;
