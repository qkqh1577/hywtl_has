import React from 'react';
import {AppRoutes} from "services/common/routes";
import CompanyPage from './Page';
import CompanyForm from "./Form";
import CompanyDetail from './Detail';

const routes: AppRoutes[] = [
  {
    path: '/company',
    element: <CompanyPage/>
  },
  {
    path: '/company/add',
    element: <CompanyForm />
  },
  {
    path: '/company/modify/:id',
    element: <CompanyForm />
  },
  {
    path: '/company/:id',
    element: <CompanyDetail />
  },
];

export default routes;