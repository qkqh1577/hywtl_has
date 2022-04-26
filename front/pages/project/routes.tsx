import React from 'react';
import { AppRoutes } from 'services/common/routes';
import List from './List';

const routes: AppRoutes[] = [
  {
    path: '/project/*',
    element: <List />
  }
];

export default routes;