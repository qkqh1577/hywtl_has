import React from 'react';
import {AppRoutes} from "common/routes";
import HrCardPage from './HrCardPage';
import HrCardDetailPage from './HrCardDetailPage'

const routes: AppRoutes[] = [
  {
    path: '/hr/card',
    element: <HrCardPage></HrCardPage>
  },{
    path: '/hr/card/detail',
    element: <HrCardDetailPage></HrCardDetailPage>
  }
];

export default routes;