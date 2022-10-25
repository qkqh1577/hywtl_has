import ProjectContainer from 'project/route/container';
import { Box } from '@mui/material';
import React from 'react';
import { AppRoute } from 'services/routes';
import SectionLayout from 'layouts/SectionLayout';
import TextBox from 'layouts/Text';
import ProjectCollectionListRoute from 'project_collection/route/list';


function Element() {

  return (
    <ProjectContainer>
      <Box sx={{ width: '100%' }}>
        <ProjectCollectionListRoute />
        <SectionLayout title="프로젝트 진행 정보">
          <TextBox variant="body11">TBD</TextBox>
        </SectionLayout>
        <SectionLayout title="대지모형 진행 정보">
          <TextBox variant="body11">TBD</TextBox>
        </SectionLayout>
        <SectionLayout title="동별 진행 정보">
          <TextBox variant="body11">TBD</TextBox>
        </SectionLayout>
      </Box>
    </ProjectContainer>
  );
}

const projectProgressRoute: AppRoute = {
  path:    '/project/sales-management/:id/progress',
  element: <Element />
};
export default projectProgressRoute;