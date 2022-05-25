import React from 'react';
import {AppRoutes} from "services/common/routes";
import DepartmentPage from 'pages/department/Page';
import DepartmentDetail from 'pages/department/Detail';
import DepartmentTreeView from 'pages/department/TreeView';

const routes: AppRoutes[] = [
  {
    path: '/department',
    element: <DepartmentPage />
  },
  {
    path: '/department-tree',
    element: <DepartmentTreeView />
  },
  {
    path: '/department/add',
    element: <DepartmentDetail />
  },
  {
    path: '/department/:id',
    element: <DepartmentDetail />
  }
];

export default routes;