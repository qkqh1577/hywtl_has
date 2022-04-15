import React from 'react';
import {AppRoutes} from "services/common/routes";
import ProjectPage from './ProjectPage';
import ProjectDetailPage from './ProjectDetailPage'

const routes: AppRoutes[] = [
  {
    path: '/project',
    element: <ProjectPage/>
  },{
    path: '/project/detail',
    element: <ProjectDetailPage/>
  }
];

export default routes;