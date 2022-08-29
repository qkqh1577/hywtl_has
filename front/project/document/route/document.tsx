import React from 'react';
import { AppRoute } from 'services/routes';
import useId from 'services/useId';
import ProjectContainer from 'project/route/container';
import ProjectDocument from 'project/document/view';

function Element() {
  const id = useId();
  if (!id) {
    return null;
  }

  return (
    <ProjectContainer>
      <ProjectDocument />
    </ProjectContainer>
  )
}

const projectDocumentRoute: AppRoute = {
  path: '/project/sales-management/:id/document',
  element: <Element />
}

export default projectDocumentRoute;
