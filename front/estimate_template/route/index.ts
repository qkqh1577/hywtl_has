import { AppRoute } from 'services/routes';
import estimateTemplateListRoute from 'estimate_template/route/list';
import estimateTemplateDetailRoute from 'estimate_template/route/detail';

const estimateTemplateRoutes: AppRoute[] = [
  estimateTemplateListRoute,
  estimateTemplateDetailRoute
];

export default estimateTemplateRoutes;