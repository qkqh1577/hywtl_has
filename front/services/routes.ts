import {
  RouteObject,
  useRoutes
} from 'react-router-dom';
import { PathRouteProps } from 'react-router/dist/lib/components';

import businessDetailRoute from 'business/route/detail';
import businessPageRoute from 'business/route/page';
import contractBasicTemplateRoute from 'admin/contract/basic/route';
import contractCollectionTemplateRoute from 'admin/contract/collection/route';
import contractConditionTemplateRoute from 'admin/contract/condition/route';
import departmentDetailRoute from 'department/route/detail';
import departmentPageRoute from 'department/route/page';
import estimateContentDetailRoute from 'admin/estimate/content/route/detail';
import estimateContentListRoute from 'admin/estimate/content/route/list';
import estimateTemplateDetailRoute from 'admin/estimate/template/route/detail';
import estimateTemplateListRoute from 'admin/estimate/template/route/list';
import loginRoute from 'login/route/login';
import personnelDetailRoute from 'personnel/route/detail';
import personnelPageRoute from 'personnel/route/page';
import projectBasicRoute from 'project_basic/route';
import projectComplexRoute from 'project_complex/route';
import projectDocumentRoute from 'project_document/route';
import projectEstimateContractRoute from 'project_estimate_contract/route';
import projectLogRoute from 'project_log/route';
import projectProgressRoute from 'project_progress/route';
import projectScheduleRoute from 'project_schedule/route';
import userDetailRoute from 'user/route/detail';
import userPageRoute from 'user/route/page';
import salesDbPageRoute from '../project_db/route/page';
import ganttPageRoute from '../gantt/route/page';
import loginForgotRoute from 'login/route/password';

export interface AppRoute
  extends PathRouteProps {
  // extension wrapper
}

const Routes = () => {
  const routes: AppRoute[] = [
    businessDetailRoute,
    businessPageRoute,
    contractBasicTemplateRoute,
    contractCollectionTemplateRoute,
    contractConditionTemplateRoute,
    departmentDetailRoute,
    departmentPageRoute,
    estimateContentDetailRoute,
    estimateContentListRoute,
    estimateTemplateDetailRoute,
    estimateTemplateListRoute,
    loginRoute,
    loginForgotRoute,
    personnelDetailRoute,
    personnelPageRoute,
    projectBasicRoute,
    projectComplexRoute,
    projectDocumentRoute,
    projectEstimateContractRoute,
    projectLogRoute,
    projectProgressRoute,
    projectScheduleRoute,
    userDetailRoute,
    userPageRoute,
    salesDbPageRoute,
    ganttPageRoute,
  ];

  return useRoutes(routes as RouteObject[]);
};

export default Routes;
