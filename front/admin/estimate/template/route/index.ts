import { AppRoute } from 'services/routes';
import estimateTemplateListRoute from 'admin/estimate/template/route/list';
import estimateTemplateDetailRoute from 'admin/estimate/template/route/detail';

const estimateTemplateRoutes: AppRoute[] = [
  estimateTemplateListRoute,
  estimateTemplateDetailRoute
];

export default estimateTemplateRoutes;