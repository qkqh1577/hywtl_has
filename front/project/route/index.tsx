import { AppRoute } from 'services/routes';
import React from 'react';

function Element() {

  return (
    <div></div>
  );
}

const projectRoutes: AppRoute[] = [{
  path:    '/project/:id/*',
  element: <Element />
}];

export default projectRoutes;