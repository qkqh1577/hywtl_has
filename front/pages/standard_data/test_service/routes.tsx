import React from 'react';
import { AppRoutes } from 'services/common/routes';
import TestServiceTemplateList from 'pages/standard_data/test_service/List';
import TestServiceTemplateDetail from 'pages/standard_data/test_service/Detail';

const TestServiceTemplateRoutes: AppRoutes[] = [
  {
    path: '/test-service',
    element: <TestServiceTemplateList />
  },
  {
    path: '/test-service/add',
    element: <TestServiceTemplateDetail />
  },
  {
    path: '/test-service/:id',
    element: <TestServiceTemplateDetail />
  }
];

export default TestServiceTemplateRoutes;