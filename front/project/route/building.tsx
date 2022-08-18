import { AppRoute } from 'services/routes';
import React from 'react';
import useId from 'services/useId';
import ProjectBuilding from 'project/view/Building';
import ProjectContainer from 'project/route/container';

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
  path:    '/project/sales-management/:id/building',
  element: <Element />
};

export default projectBuildingRoute;