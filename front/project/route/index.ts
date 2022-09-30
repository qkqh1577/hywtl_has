import { AppRoute } from 'services/routes';
import projectBasicRoute from 'project_basic/route';
import projectDocumentRoute from 'project_document/route/document';
import projectComplexRoute from 'project_complex/route';
import projectEstimateContractRoute from 'project_estimate_contract/route';
import { projectProgressRoute } from 'project_progress/route';
import { projectLogRoute } from 'project_log/route/log';
import { projectScheduleRoute } from 'project_schedule/route/schedule';

const projectRoutes: AppRoute[] = [
  projectBasicRoute,
  projectDocumentRoute,
  projectComplexRoute,
  projectProgressRoute,
  projectEstimateContractRoute,
  projectScheduleRoute,
  projectLogRoute,
];

export default projectRoutes;
