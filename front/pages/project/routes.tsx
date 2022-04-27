import React from 'react';
import { AppRoutes } from 'services/common/routes';
import ProjectContainer from 'pages/project/Container';

const routes: AppRoutes[] = [
  {
    path: '/project/:id/*',
    element: <ProjectContainer />
  },
  {
    path: '/project/*',
    element: <ProjectContainer />
  },
];

export default routes;
