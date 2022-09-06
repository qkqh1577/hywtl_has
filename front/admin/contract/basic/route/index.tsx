import React from 'react';
import { AppRoute } from 'services/routes';
import ContractBasicTemplate from 'admin/contract/basic/view/Template';

function Element() {

  return(
    <ContractBasicTemplate />
  )
}

const contractBasicTemplateRoute: AppRoute = {
  path: '/admin/contract/basic-management',
  element: <Element />
}
export default contractBasicTemplateRoute;