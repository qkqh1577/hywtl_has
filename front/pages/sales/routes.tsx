import React from 'react';
import {AppRoutes} from "services/common/routes";
import SalesPage from './SalesPage';
import SalesDetailPage from './SalesDetailPage'

const routes: AppRoutes[] = [
  {
    path: '/sales',
    element: <SalesPage/>
  },{
    path: '/sales/detail',
    element: <SalesDetailPage/>
  }
];

export default routes;