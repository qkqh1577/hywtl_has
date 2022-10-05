import UserPage from 'user/view/Page';
import React, {
  useCallback,
  useEffect,
} from 'react';
import { AppRoute } from 'services/routes';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { userAction } from 'user/action';
import {
  initialUserQuery,
  UserQuery
} from 'user/query';
import { RootState } from 'services/reducer';
import { useFormik } from 'formik';

function Element() {
  const dispatch = useDispatch();

  const { page } = useSelector((root: RootState) => root.user);
  const setFilter = useCallback((formikProps: UserQuery) => dispatch(userAction.setFilter(formikProps)), [dispatch]);

  const formik = useFormik<UserQuery>({
    initialValues: initialUserQuery,
    onSubmit:      (values) => {
      setFilter(values);
    }
  });

  useEffect(() => {
    setFilter(initialUserQuery);
  }, []);

  useEffect(() => {
    formik.setSubmitting(false);
  }, [page]);

  return (
    <UserPage
      page={page}
      formik={formik}
    />
  );
}

const userPageRoute: AppRoute = {
  path:    '/admin/user-management',
  element: <Element />
};

export default userPageRoute;