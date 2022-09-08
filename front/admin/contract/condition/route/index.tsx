import React from 'react';
import { AppRoute } from 'services/routes';
import ContractConditionTemplate from 'admin/contract/condition/view';

function Element() {
  return(
    <ContractConditionTemplate/>
  )
}

export const contractConditionTemplateRoute: AppRoute = {
  path: '/admin/contract/condition-management',
  element: <Element />
};
