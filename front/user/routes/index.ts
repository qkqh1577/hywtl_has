import userPageRoute from 'user/routes/page';
import userDetailRoute from 'user/routes/detail';
import { AppRoutes } from 'services/routes';

const userRoutes: AppRoutes[] = [
  userPageRoute,
  userDetailRoute,
];

export default userRoutes;