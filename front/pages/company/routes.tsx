import React from 'react';
import {AppRoutes} from "services/common/routes";
import CompanyPage from './Page';
import CompanyAddForm from "./AddForm";
import CompanyDetail from './Detail';

const routes: AppRoutes[] = [
  {
    path: '/company',
    element: <CompanyPage/>
  },
  {
    path: '/company/add',
    element: <CompanyAddForm />
  },
  {
    path: '/company/:id',
    element: <CompanyDetail />
  },
];

export default routes;