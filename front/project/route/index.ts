import { AppRoute } from 'services/routes';
import projectBasicRoute from 'project/basic/route';
import projectBuildingRoute from 'project/route/building';

const projectRoutes: AppRoute[] = [
  projectBasicRoute,
  projectBuildingRoute,
];

export default projectRoutes;