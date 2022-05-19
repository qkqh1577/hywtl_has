import React from 'react';
import { AppRoutes } from 'services/common/routes';
import ServiceItemList from './List';
import ServiceItemDetail from './Detail';
import ServiceItemMod from './ModForm';
import ServiceItemAdd from './AddForm';

const routes: AppRoutes[] = [
  {
    path: 'serviceItem',
    element: <ServiceItemList />
  },
  {
    path: 'serviceItem/:id',
    element: <ServiceItemDetail />
  },
  {
    path: '/serviceItem/modify/:id',
    element: <ServiceItemMod />
  },
  {
    path: '/serviceItem/add',
    element: <ServiceItemAdd />
  }
]

export default routes;