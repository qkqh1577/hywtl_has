import userPageRoute from 'user/route/page';
import userDetailRoute from 'user/route/detail';
import { AppRoute } from 'services/routes';

const userRoutes: AppRoute[] = [
  userPageRoute,
  userDetailRoute,
];

export default userRoutes;