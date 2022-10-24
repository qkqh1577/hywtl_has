import {
  RouteObject,
  useRoutes
} from 'react-router-dom';

import userRoutes from 'user/route';
import appRoutes from 'app/route';
import departmentRoutes from 'department/route';
import estimateTemplateRoutes from 'admin/estimate/template/route';
import projectRoutes from 'project/route';
import businessRoutes from 'business/route';
import estimateContentRoutes from 'admin/estimate/content/route';
import contractBasicTemplateRoute from 'admin/contract/basic/route';
import contractCollectionTemplateRoute from 'admin/contract/collection/route';
import { contractConditionTemplateRoute } from 'admin/contract/condition/route';
import personnelRoutes from 'personnel/route';
import projectSalesDbAnalysisRoutes from "project_db/route";
import { PathRouteProps } from 'react-router/dist/lib/components';

export interface AppRoute
  extends PathRouteProps {
  // extension wrapper
}

const Routes = () => {
  const routes: AppRoute[] = [
    ...appRoutes,
    ...businessRoutes,
    ...departmentRoutes,
    ...estimateContentRoutes,
    ...estimateTemplateRoutes,
    ...personnelRoutes,
    ...projectRoutes,
    ...userRoutes,
    ...projectSalesDbAnalysisRoutes,
    contractBasicTemplateRoute,
    contractCollectionTemplateRoute,
    contractConditionTemplateRoute,
  ];

  return useRoutes(routes as RouteObject[]);
};

export default Routes;
