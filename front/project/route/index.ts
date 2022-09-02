import { AppRoute } from 'services/routes';
import projectBasicRoute from 'project/basic/route';
import projectBuildingRoute from 'project/route/building';
import projectDocumentRoute from 'project/document/route/document';
import projectComplexRoute from 'project_complex/route';

const projectRoutes: AppRoute[] = [
  projectBasicRoute,
  projectBuildingRoute,
  projectDocumentRoute,
  projectComplexRoute,
];

export default projectRoutes;
