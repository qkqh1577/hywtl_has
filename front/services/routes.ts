import {
  RouteObject,
  RouteProps,
  useRoutes
} from 'react-router-dom';

import userRoutes from 'user/route';
import appRoutes from 'app/route';
import departmentRoutes from 'department/route';
import estimateTemplateRoutes from 'estimate/route';

export interface AppRoute
  extends RouteProps {
  // extension wrapper
}

const Routes = () => {
  const routes: AppRoute[] = [
    ...userRoutes,
    ...appRoutes,
    ...departmentRoutes,
    ...estimateTemplateRoutes,
  ];

  return useRoutes(routes as RouteObject[]);
};

export default Routes;
