import { AppRoute } from 'services/routes';
import projectBasicRoute from 'project/basic/route';
import projectBuildingRoute from 'project/route/building';
import projectDocumentRoute from 'project/document/route/document';

const projectRoutes: AppRoute[] = [
  projectBasicRoute,
  projectBuildingRoute,
  projectDocumentRoute,
];

export default projectRoutes;
