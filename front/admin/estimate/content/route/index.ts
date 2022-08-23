import { AppRoute } from 'services/routes';
import estimateContentListRoute from 'admin/estimate/content/route/ list';
import estimateContentDetailRoute from 'admin/estimate/content/route/detail';

const estimateContentRoutes: AppRoute[] = [
  estimateContentListRoute,
  estimateContentDetailRoute
];

export default estimateContentRoutes;
