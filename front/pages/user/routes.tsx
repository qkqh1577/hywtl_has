import React from 'react';
import { AppRoutes } from 'routes/routes';

import UserPage from './UserPage';
import UserForm from './Form';
import UserDetailPage from './UserDetailPage';
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
    path: '/user/:id',
    element: <UserDetailPage />
  },
  {
    path: '/user/authenticate',
    element: <AuthenticationForm />
  },
];

export default routes;