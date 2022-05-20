import React from 'react';
import { AppRoutes } from 'services/common/routes';
import Page from './Page';
import BusinessAddForm from './AddForm';
import BusinessModForm from './ModForm';
import BusinessDetail from './Detail';

const routes: AppRoutes[] = [
  {
    path: '/business-management',
    element: <Page />
  },
  {
    path: '/business-management/add',
    element: <BusinessAddForm />
  },
  {
    path: '/business-management/:id/form',
    element: <BusinessModForm />
  },
  {
    path: '/business-management/:id',
    element: <BusinessDetail />
  },
];

export default routes;
