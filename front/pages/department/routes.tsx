import React from 'react';
import {AppRoutes} from "common/routes";
import DepartmentPage from 'pages/department/Page';
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