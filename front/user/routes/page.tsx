import UserPage from 'user/view/Page';
import React, {
  useCallback,
  useEffect,
} from 'react';
import { AppRoutes } from 'services/routes';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { userAction } from 'user/domain/action';
import {
  initialUserQuery,
  UserQuery
} from 'user/parameter/query';
import { RootState } from 'services/common/reducer';

function Element() {
  const dispatch = useDispatch();
  const { filter, page } = useSelector((root: RootState) => root.user);

  const setFilter = useCallback((nextFilter?: Partial<UserQuery>) => {
    const result: UserQuery = {
      ...(filter ?? initialUserQuery),
      ...(nextFilter ?? initialUserQuery),
    };
    dispatch(userAction.setFilter(filter && !nextFilter ? filter : result));
  }, [dispatch]);

  useEffect(() => {
    setFilter();
  }, []);

  return (
    <UserPage
      pageQuery={filter}
      onSubmit={(values) => {
        setFilter({
          ...values,
          page: 0,
        });
      }}
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

const userPageRoute: AppRoutes = {
  path:    '/user',
  element: <Element />
};

export default userPageRoute;