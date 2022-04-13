import React from 'react';
import {AppRoutes} from "common/routes";
import DepartmentPage from 'pages/department/Page';
import DepartmentDetailPage from 'pages/department/Detail'

const routes: AppRoutes[] = [
  {
    path: '/department',
    element: <DepartmentPage />
  },{
    path: '/department/:id',
    element: <DepartmentDetailPage />
  }
];

export default routes;