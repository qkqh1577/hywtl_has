import React, {
  useCallback,
  useEffect
} from 'react';
import useId from 'services/useId';
import useDialog from 'components/Dialog';
import {
  initialUser,
  UserVO
} from 'user/domain';
import UserDetail from 'user/view/Detail';
import { AppRoute } from 'services/routes';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  FormikValues,
  useFormik,
} from 'formik';
import {
  userAction
} from 'user/action';
import UserChangeParameter from 'user/parameter';
import { FormikSubmit } from 'type/Form';

function Element() {
  const id = useId();

  const { confirm } = useDialog();
  const dispatch = useDispatch();
  const { detail } = useSelector((root: FormikValues) => root.user);

  const change = useCallback(
    (formikProps: FormikSubmit<UserChangeParameter>) =>
      dispatch(userAction.change(formikProps)),
    [dispatch]
  );

  const formik = useFormik<UserVO>({
    enableReinitialize: true,
    initialValues:      detail ?? initialUser,
    onSubmit:           (values,
                         helpers
                        ) => {
      change({
        values,
        ...helpers
      });
    }
  });

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'user/id/set',
        id
      });
    }
  }, [id]);

  return (
    <UserDetail
      formik={formik}
      handlePassword={() => {
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
  );
}

const userDetailRoute: AppRoute = {
  path:    '/admin/user-management/:id',
  element: <Element />
};

export default userDetailRoute;