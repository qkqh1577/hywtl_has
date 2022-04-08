import React from 'react';
import {AppRoutes} from "routes/routes";

import UserPage from './UserPage';
import UserDetailPage from './UserDetailPage'

const routes: AppRoutes[] = [
  {
    path: '/user',
    element: <UserPage />
  }, {
    path: '/user/detail',
    element: <UserDetailPage />
  }
];

export default routes;