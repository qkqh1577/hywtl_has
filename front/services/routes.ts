import {
  RouteObject,
  RouteProps,
  useRoutes
} from 'react-router-dom';

import userRoutes from 'user/route';
import appRoutes from 'app/route';
import departmentRoutes from 'department/route';
import estimateTemplateRoutes from 'estimate_template/route';
import projectRoutes from 'project/route';
import businessRoutes from "business/route";
import estimateContentRoutes from 'admin/estimate/content/route';
import contractBasicTemplateRoute from 'admin/contract/basic/route';

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
    ...projectRoutes,
    ...businessRoutes,
    ...estimateContentRoutes,
    contractBasicTemplateRoute,
  ];

  return useRoutes(routes as RouteObject[]);
};

export default Routes;
