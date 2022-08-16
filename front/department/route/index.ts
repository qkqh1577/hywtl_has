import { AppRoute } from 'services/routes';
import departmentPageRoute from 'department/route/page';
import departmentDetailRoute from 'department/route/detail';

const departmentRoutes: AppRoute[] = [
  departmentPageRoute,
  departmentDetailRoute
];

export default departmentRoutes;