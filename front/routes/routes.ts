import {RouteObject, RouteProps, useRoutes} from "react-router-dom";

import departmentRoutes from 'pages/department/routes';
import userRoutes from 'pages/user/routes'
import hrCard from 'pages/hr/routes'
import sales from 'pages/sales/routes'
import project from 'pages/project/routes'

export interface AppRoutes extends RouteProps {
  // extension wrapper
};
export {};


const Routes = () => {

  const routes: AppRoutes[] = [
    ...departmentRoutes,
    ...userRoutes,
    ...hrCard,
    ...sales,
    ...project
  ];

  const elements = useRoutes(routes as RouteObject[]);
  return elements;
};

export default Routes;