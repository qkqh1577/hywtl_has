import React from 'react';
import {AppRoutes} from "common/routes";
import SalesPage from './SalesPage';
import SalesDetailPage from './SalesDetailPage'

const routes: AppRoutes[] = [
  {
    path: '/sales',
    element: <SalesPage></SalesPage>
  },{
    path: '/sales/detail',
    element: <SalesDetailPage></SalesDetailPage>
  }
];

export default routes;