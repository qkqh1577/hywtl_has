import React from 'react';
import {AppRoutes} from "routes/routes";
import DepartmentPage from './DepartmentPage';
import DepartmentDetailPage from './DepartmentDetailPage'

const routes: AppRoutes[] = [
  {
    path: '/department',
    element: <DepartmentPage />
  },{
    path: '/department/detail',
    element: <DepartmentDetailPage />
  }
];

export default routes;