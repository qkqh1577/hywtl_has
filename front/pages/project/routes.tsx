import React from 'react';
import {AppRoutes} from "routes/routes";
import ProjectPage from './ProjectPage';
import ProjectDetailPage from './ProjectDetailPage'

const routes: AppRoutes[] = [
  {
    path: '/project',
    element: <ProjectPage></ProjectPage>
  },{
    path: '/project/detail',
    element: <ProjectDetailPage></ProjectDetailPage>
  }
];

export default routes;