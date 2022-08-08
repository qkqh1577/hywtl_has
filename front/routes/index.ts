import {
  RouteObject,
  RouteProps,
  useRoutes
} from 'react-router-dom';

import userRoutes from 'routes/user';
import LoginRoutes from 'routes/app';

export interface AppRoutes
  extends RouteProps {
  // extension wrapper
}

const Routes = () => {
  const routes: AppRoutes[] = [
    ...userRoutes,
    ...LoginRoutes,
  ];

  return useRoutes(routes as RouteObject[]);
};

export default Routes;
