import React from 'react';
import { AppRoutes } from 'services/common/routes';
import CompanyPage from './Page';
import CompanyAddForm from './AddForm';
import CompanyModForm from './ModForm';
import CompanyDetail from './Detail';

const routes: AppRoutes[] = [
  {
    path: '/company',
    element: <CompanyPage />
  },
  {
    path: '/company/add',
    element: <CompanyAddForm />
  },
  {
    path: '/company/modify/:id',
    element: <CompanyModForm />
  },
  {
    path: '/company/:id',
    element: <CompanyDetail />
  },
];

export default routes;
