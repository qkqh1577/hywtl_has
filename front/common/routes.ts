import { RouteObject, RouteProps, useRoutes } from 'react-router-dom';

import departmentRoutes from 'pages/department/routes';
import userRoutes from 'pages/user/routes';
import hrCard from 'pages/hr/routes';
import sales from 'pages/sales/routes';
import project from 'pages/project/routes';

export interface AppRoutes extends RouteProps {
  // extension wrapper
}

const Routes = () => {
  const routes: AppRoutes[] = [
    ...departmentRoutes,
    ...userRoutes,
    ...hrCard,
    ...sales,
    ...project
  ];

  return useRoutes(routes as RouteObject[]);
};

export default Routes;
