import { AppRoute } from 'services/routes';
import projectBasicRoute from 'project_basic/route';
import projectDocumentRoute from 'project_document/route/document';
import projectComplexRoute from 'project_complex/route';
import projectEstimateContractRoute from 'project_estimate_contract/route';

const projectRoutes: AppRoute[] = [
  projectBasicRoute,
  projectDocumentRoute,
  projectComplexRoute,
  projectEstimateContractRoute,
];

export default projectRoutes;
