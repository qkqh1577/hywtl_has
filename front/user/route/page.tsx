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
import { pageSizeList } from 'type/Page';
import { FormikSubmit } from 'type/Form';

function Element() {
  const dispatch = useDispatch();

  const { filter, page } = useSelector((root: RootState) => root.user);
  const setFilter = useCallback((formikProps: FormikSubmit<Partial<UserQuery>>) => {
    const result: UserQuery = {
      ...(filter ?? initialUserQuery),
      ...formikProps.values,
    };
    dispatch(userAction.setFilter({
      ...formikProps,
      values: result
    }));
  }, [dispatch]);

  const formik = useFormik<UserQuery>({
    initialValues: initialUserQuery,
    onSubmit:      (values,
                    helper
                   ) => {
      setFilter({
        values: {
          ...values,
          page: 0,
        },
        ...helper
      });
    }
  });

  useEffect(() => {
    setFilter(formik);
  }, []);

  return (
    <UserPage
      page={page}
      formik={formik}
      onPageChange={(e,
                     pageNum
      ) => {
        setFilter({
          ...formik,
          values: {
            ...filter,
            page: pageNum,
          },
        });
      }}
      onRowsPerPageChange={(e) => {
        setFilter({
          ...formik,
          values: {
            ...filter,
            size: +(e.target.value) || pageSizeList[0],
            page: 0,
          },
        });
      }}
    />
  );
}

const userPageRoute: AppRoute = {
  path:    '/admin/user-management',
  element: <Element />
};

export default userPageRoute;