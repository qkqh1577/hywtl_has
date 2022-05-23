import React from 'react';
import { AppRoutes } from 'services/common/routes';
import Page from './Page';
import BusinessForm from './Detail';

const routes: AppRoutes[] = [
  {
    path: '/business-management',
    element: <Page />
  },
  {
    path: '/business-management/add',
    element: <BusinessForm />
  },
  {
    path: '/business-management/:id/form',
    element: <BusinessForm />
  },
  {
    path: '/business-management/:id',
    element: <BusinessForm />
  },
];

export default routes;
