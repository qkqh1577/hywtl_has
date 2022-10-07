import React, {
  useCallback,
  useEffect
} from 'react';
import useId from 'services/useId';
import useDialog from 'components/Dialog';
import { UserId } from 'user/domain';
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
  UserChangeParameter
} from 'user/parameter';
import { RootState } from 'services/reducer';
import { ApiStatus } from 'components/DataFieldProps';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const { detail, requestChange } = useSelector((root: RootState) => root.user);
  const { confirm, error, rollback, alert } = useDialog();
  const change = useCallback((formikProps: UserChangeParameter) => dispatch(userAction.change(formikProps)), [dispatch]);

  const formik = useFormik<UserChangeParameter>({
    initialValues: initialUserParameter,
    onSubmit:      (values) => {
      change(values);
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
    if (requestChange === ApiStatus.DONE) {
      alert('변경하였습니다.');
      formik.setSubmitting(false);
      dispatch(userAction.setId(UserId(id!)));
      dispatch(userAction.requestChange(ApiStatus.IDLE));
    }
    else if (requestChange === ApiStatus.FAIL) {
      error('변경에 실패하였습니다.');
      formik.setSubmitting(false);
      dispatch(userAction.requestChange(ApiStatus.IDLE));
    }
  }, [requestChange]);

  return (
    <FormikProvider value={formik}>
      <UserDetail
        onCancel={() => {
          rollback(() => {
            formik.setValues({
              ...detail,
              edit: false,
            } as unknown as UserChangeParameter);
          });
        }}
        onPasswordChange={() => {
          confirm({
            status:       'ok',
            children:     '비밀번호 변경 안내 메일을 발송하겠습니까?',
            confirmText:  '발송',
            afterConfirm: () => {
              console.log('TODO: reset password');
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
