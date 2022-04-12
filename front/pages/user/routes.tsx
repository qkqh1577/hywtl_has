import React from 'react';
import { AppRoutes } from 'common/routes';

import UserPage from 'pages/user/Page';
import UserForm from 'pages/user/UserInviteForm';
import UserDetail from 'pages/user/Detail';
import AuthenticationForm from 'pages/user/AuthenticationForm';

const routes: AppRoutes[] = [
  {
    path: '/user',
    element: <UserPage />
  },
  {
    path: '/user/add',
    element: <UserForm />
  },
  {
    path: '/user/authenticate',
    element: <AuthenticationForm />
  },
  {
    path: '/user/:id',
    element: <UserDetail />
  },
];

export default routes;