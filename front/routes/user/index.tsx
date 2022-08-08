import { AppRoutes } from 'routes';
import UserPage from 'user/view/Page';
import UserDetail from 'user/view/Detail';
import React, { useEffect } from 'react';
import useUser from 'user/service/hook';
import {
  initialUser,
  UserId,
} from 'user/domain/user';
import useDialog from 'components/Dialog';
import useId from 'services/common/hook/useId';

function PageElement() {

  const { filter, setFilter, page } = useUser();
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
      ) => {
        setFilter({
          ...filter,
          page,
        });
      }}
      onRowsPerPageChange={(event) => {
        const size = +(event.target.value) || 10;
        setFilter({
          ...filter,
          size,
          page: 0,
        });
      }}
    />
  );
}

function DetailElement() {
  const id = useId();
  const { confirm } = useDialog();
  const { detail, getOne } = useUser();
  useEffect(() => {
    if (id) {
      getOne(UserId(id));
    }
  }, [id]);
  return (
    <UserDetail
      formik={{
        enableReinitialize: true,
        initialValues:      detail ?? initialUser,
        onSubmit:           (values) => {

        },
      }}
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

const UserRoutes: AppRoutes[] = [{
  path:    '/user',
  element: <PageElement />
}, {
  path:    '/user/:id',
  element: <DetailElement />
}];

export default UserRoutes;