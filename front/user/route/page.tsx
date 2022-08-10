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
import { userAction } from 'user/domain/action';
import {
  initialUserQuery,
  UserQuery
} from 'user/parameter/query';
import { RootState } from 'services/reducer';
import { useFormik } from 'formik';

function Element() {
  const dispatch = useDispatch();

  const { filter, page } = useSelector((root: RootState) => root.user);
  // TODO: formikProps
  const setFilter = useCallback((nextFilter?: Partial<UserQuery>) => {
    const result: UserQuery = {
      ...(filter ?? initialUserQuery),
      ...(nextFilter ?? initialUserQuery),
    };
    dispatch(userAction.setFilter(filter && !nextFilter ? filter : result));
  }, [dispatch]);

  const formik = useFormik<UserQuery>({
    initialValues: filter ?? initialUserQuery,
    onSubmit:      setFilter
  });

  useEffect(() => {
    setFilter();
  }, []);

  return (
    <UserPage
      formik={formik}
      page={page}
      onPageChange={(event,
                     page
      ) => setFilter({ page })}
      onRowsPerPageChange={(event) => {
        const size = +(event.target.value) || 10;
        setFilter({ size, page: 0 });
      }}
    />
  );
}

const userPageRoute: AppRoute = {
  path:    '/user',
  element: <Element />
};

export default userPageRoute;