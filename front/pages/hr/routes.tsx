import React from 'react';
import { AppRoutes } from 'services/common/routes';
import PersonnelPage from './Page';
import PersonnelDetail from './Detail';

const routes: AppRoutes[] = [
  {
    path: '/hr/card',
    element: <PersonnelPage />
  },
  {
    path: '/hr/card/:id',
    element: <PersonnelDetail />
  }
];

export default routes;