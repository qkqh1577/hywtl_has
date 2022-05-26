import { RouteObject, RouteProps, useRoutes } from 'react-router-dom';

import departmentRoutes from 'pages/department/routes';
import userRoutes from 'pages/user/routes';
import hrCardRoutes from 'pages/hr/routes';
import sales from 'pages/sales/routes';
import projectRoutes from 'pages/project/routes';
import businessRoutes from 'pages/business/routes';
import TestServiceTemplateRoutes from 'pages/standard_data/test_service/routes';

export interface AppRoutes extends RouteProps {
  // extension wrapper
}

const Routes = () => {
  const routes: AppRoutes[] = [
    ...departmentRoutes,
    ...userRoutes,
    ...hrCardRoutes,
    ...sales,
    ...projectRoutes,
    ...businessRoutes,
    ...TestServiceTemplateRoutes,
  ];

  return useRoutes(routes as RouteObject[]);
};

export default Routes;
