import React from 'react';
import {AppRoutes} from "services/common/routes";
import HrCardPage from './HrCardPage';
import HrCardDetailPage from './HrCardDetailPage'

const routes: AppRoutes[] = [
  {
    path: '/hr/card',
    element: <HrCardPage/>
  },{
    path: '/hr/card/detail',
    element: <HrCardDetailPage/>
  }
];

export default routes;