import React from 'react';
import { AppRoutes } from 'services/common/routes';
import Page from './Page';
import BusinessAddForm from './AddForm';
import BusinessModForm from './ModForm';
import BusinessDetail from './Detail';

const routes: AppRoutes[] = [
  {
    path: '/business',
    element: <Page />
  },
  {
    path: '/business/add',
    element: <BusinessAddForm />
  },
  {
    path: '/business/modify/:id',
    element: <BusinessModForm />
  },
  {
    path: '/business/:id',
    element: <BusinessDetail />
  },
];

export default routes;
