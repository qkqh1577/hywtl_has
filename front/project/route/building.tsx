import { AppRoute } from 'services/routes';
import React from 'react';
import ProjectContainer from 'project/view/Container';
import useId from 'services/useId';
import ProjectBuilding from 'project/view/Building';


function Element() {
  const id = useId();

  if (!id) {
    return null;
  }

  return (
    <ProjectContainer>
      <ProjectBuilding />
    </ProjectContainer>
  );
}

const projectBuildingRoute: AppRoute = {
  path:    '/project/:id/building',
  element: <Element />
};

export default projectBuildingRoute;