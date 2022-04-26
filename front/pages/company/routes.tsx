import React from 'react';
import {AppRoutes} from "services/common/routes";
import CompanyPage from './CompanyPage';

const routes: AppRoutes[] = [
  {
    path: '/company',
    element: <CompanyPage/>
  },
];

export default routes;