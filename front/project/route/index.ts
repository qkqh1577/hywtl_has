import { AppRoute } from 'services/routes';
import projectBasicRoute from 'project/route/basic';
import projectBuildingRoute from 'project/route/building';

const projectRoutes: AppRoute[] = [
  projectBasicRoute,
  projectBuildingRoute,
];

export default projectRoutes;