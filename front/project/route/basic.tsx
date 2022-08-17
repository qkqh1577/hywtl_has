import { AppRoute } from 'services/routes';
import React from 'react';
import ProjectContainer from 'project/view/Container';
import ProjectBasic from 'project/view/Basic';

function Element() {

  return (
    <ProjectContainer>
      <ProjectBasic />
    </ProjectContainer>
  );
}

const projectBasicRoute: AppRoute = {
  path:    '/project/:id/basic',
  element: <Element />
};

export default projectBasicRoute;