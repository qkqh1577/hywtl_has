import React, {
  useCallback,
  useEffect
} from 'react';
import useId from 'services/common/hook/useId';
import useDialog from 'components/Dialog';
import {
  initialUser,
  UserId,
  UserVO
} from 'user/domain/user';
import UserDetail from 'user/view/Detail';
import { AppRoutes } from 'services/routes';
import { useNavigate } from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  FormikValues,
  useFormik,
} from 'formik';
import {
  FormikSubmit,
  userAction
} from 'user/domain/action';
import UserChangeParameter from 'user/parameter/ChangeParamter';

function Element() {
  const id = useId();

  const { confirm, error } = useDialog();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { detail } = useSelector((root: FormikValues) => root.user);

  const formik = useFormik<UserVO>({
    enableReinitialize: true,
    initialValues:      detail ?? initialUser,
    onSubmit:           (values,
                         formikHelpers
                        ) => {
      if (!id || id !== values.id) {
        error('잘못된 요청입니다.', () => {
          navigate('/user');
        });
        return;
      }
      change({
        values: {
          ...values,
          id: UserId(id),
        },
        ...formikHelpers
      });
    }
  });

  const change = useCallback(
    (formikProps: FormikSubmit<UserChangeParameter>) =>
      dispatch(userAction.change(formikProps)),
    [dispatch]
  );

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

const userDetailRoute: AppRoutes = {
  path:    '/user/:id',
  element: <Element />
};

export default userDetailRoute;