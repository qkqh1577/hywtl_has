import {
  RouteObject,
  RouteProps,
  useRoutes
} from 'react-router-dom';

import userRoutes from 'user/routes';
import appRoutes from 'App/route';

export interface AppRoutes
  extends RouteProps {
  // extension wrapper
}

const Routes = () => {
  const routes: AppRoutes[] = [
    ...userRoutes,
    ...appRoutes,
  ];

  return useRoutes(routes as RouteObject[]);
};

export default Routes;
