import {
  RouteObject,
  RouteProps,
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
import { projectLogRoute } from 'project_log/route/log';
import { projectScheduleRoute } from 'project_schedule/route/schedule';
import personnelRoutes from 'personnel/route';

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
    contractCollectionTemplateRoute,
    contractConditionTemplateRoute,
    projectLogRoute,
    projectScheduleRoute,
    ...personnelRoutes,
  ];

  return useRoutes(routes as RouteObject[]);
};

export default Routes;
