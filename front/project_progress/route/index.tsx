import ProjectContainer from 'project/route/container';
import { Box } from '@mui/material';
import React from 'react';
import TextBox from 'layouts/Text';
import { AppRoute } from 'services/routes';


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
        <TextBox variant="body4">준비중</TextBox>
      </Box>
    </ProjectContainer>
  );
}

export const projectProgressRoute: AppRoute = {
  path:    '/project/sales-management/:id/progress',
  element: <Element />
};