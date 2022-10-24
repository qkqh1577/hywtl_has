import ProjectContainer from 'project/route/container';
import { Box } from '@mui/material';
import React from 'react';
import { AppRoute } from 'services/routes';
import ProjectProgress from 'project_progress/view';


function Element() {

  return (
    <ProjectContainer>
      <Box sx={{
        display:      'flex',
        width:        '100%',
        flexWrap:     'wrap',
        alignContent: 'flex-start',
        flex:         1,
      }}>
        <ProjectProgress />
      </Box>
    </ProjectContainer>
  );
}

const projectProgressRoute: AppRoute = {
  path:    '/project/sales-management/:id/progress',
  element: <Element />
};
export default projectProgressRoute;