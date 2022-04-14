import React from 'react';
import {AppRoutes} from "common/routes";
import DepartmentPage from 'pages/department/Page';
import DepartmentAddForm from 'pages/department/AddForm';
import DepartmentDetail from 'pages/department/Detail';

const routes: AppRoutes[] = [
  {
    path: '/department',
    element: <DepartmentPage />
  },
  {
    path: '/department/add',
    element: <DepartmentAddForm />
  },
  {
    path: '/department/:id',
    element: <DepartmentDetail />
  }
];

export default routes;