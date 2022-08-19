import { AppRoute } from 'services/routes';
import businessPageRoute from 'business/route/page';
import businessDetailRoute from 'business/route/detail';

const businessRoutes: AppRoute[] = [
  businessDetailRoute,
  businessPageRoute
];

export default businessRoutes;
