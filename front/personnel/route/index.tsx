import { AppRoute } from 'services/routes';
import personnelDetailRoute from 'personnel/route/detail';
import personnelPageRoute from 'personnel/route/page';

const personnelRoutes: AppRoute[] = [
  personnelPageRoute,
  personnelDetailRoute,
];

export default personnelRoutes;